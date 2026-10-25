package com.example.delivey.controller;

import com.example.delivey.RestorePWD.RegistrationCompleteEventListener;
import com.example.delivey.RestorePWD.ResetPasswordRequest;
import com.example.delivey.dto.clientDto;
import com.example.delivey.model.client;
import com.example.delivey.repository.clientRepo;
import com.example.delivey.security.auth.ChangePasswordRequest;
import com.example.delivey.servicesImp.clientServiceImp;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.mail.MessagingException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.security.Principal;
import java.util.Date;
import java.util.List;
import java.util.Optional;
@Slf4j
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class clientController {

    @Autowired
    private clientServiceImp cliService;
    @Autowired
    private  clientRepo clientRepo;
    @Autowired
    private RegistrationCompleteEventListener eventListener;

    @Value("${application.security.jwt.secret-key}")
    private String secretKey;
    public clientController() {
    }
    @GetMapping("/username/{clientname}")
    public ResponseEntity<client> getClientByUsername(@PathVariable String clientname) {
        Optional<client> clientOptional = clientRepo.findByUsername(clientname);

        return clientOptional.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    @PostMapping("/password-reset-request")
    public String resetPasswordRequest(@RequestBody ResetPasswordRequest passwordRequestUtil) throws MessagingException, UnsupportedEncodingException {

        Optional<client> user = cliService.findByEmail(passwordRequestUtil.getEmail());
        String passwordResetUrl = "";
        if (user.isPresent()) {
            String passwordResetToken = generateJwtToken(user.get());
            cliService.createPasswordResetTokenForUser(user.get(), passwordResetToken);
            passwordResetUrl = passwordResetEmailLink(user.get(), passwordRequestUtil.getBaseUrl(), passwordResetToken);
        }
        return passwordResetUrl;
    }

    private String generateJwtToken(client user) {
        long expirationTimeInMs = 3600000; // 1 hour

        return Jwts.builder()
                .setSubject(user.getUsername())
                .setExpiration(new Date(System.currentTimeMillis() + expirationTimeInMs))
                .signWith(SignatureAlgorithm.HS256 ,  secretKey)
                .compact();
    }

    private String passwordResetEmailLink(client user, String BaseUrl, String passwordToken) throws MessagingException, UnsupportedEncodingException {
        String url = BaseUrl+"/reset-password?token="+passwordToken;
        eventListener.sendPasswordResetVerificationEmail(url, user);
        log.info("Click the link to reset your password :  {}", url);
        return url;
    }


    @PostMapping("/reset-password")
    public String resetPassword(@RequestBody ResetPasswordRequest passwordRequestUtil,
                                @RequestParam("token") String token){
        String tokenVerificationResult = cliService.validatePasswordResetToken(token);
        if (!tokenVerificationResult.equalsIgnoreCase("valid")) {
            return "Invalid token password reset token";
        }
        Optional<client> theUser = Optional.ofNullable(cliService.findUserByPasswordToken(token));
        if (theUser.isPresent()) {
            cliService.resetPassword(theUser.get(), passwordRequestUtil.getNewPassword());
            return "Password has been reset successfully";
        }
        return "Invalid password reset token";
    }

    @PutMapping("client/change")
    public ResponseEntity<?> changePassword(
            @RequestBody ChangePasswordRequest request,
            Principal connectedUser
    ) {
        cliService.changePassword(request, connectedUser);
        return ResponseEntity.ok().build();
    }
    @PostMapping("client/add")
    public ResponseEntity<client> AddClient(@RequestBody client c){
        client newc=cliService.AddClient(c);
        return new ResponseEntity<>(newc, HttpStatus.CREATED);
    }

    @PutMapping("client/update")
    public ResponseEntity<client> updateClient(@RequestParam("email") String email, @RequestBody clientDto ClientDto) {
        client updatedClient = cliService.updateClient(email, ClientDto);
        return new ResponseEntity<>(updatedClient, HttpStatus.OK);
    }

    @DeleteMapping("/client/delete/{id}")
    public ResponseEntity<String> deleteClient(@PathVariable Integer id) {
        return cliService.deleteClient(id);
    }

    @GetMapping("/clients")
    public ResponseEntity<List<client>> getAllClients() {
        List<client> clients = cliService.getAllClients();
        return new ResponseEntity<>(clients, HttpStatus.OK);
    }

    @GetMapping("/client/{id}")
    public ResponseEntity<client> getClientById(@PathVariable Integer id) {
        client client = cliService.getClientById(id);
        if (client != null) {
            return new ResponseEntity<>(client, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/company")
    public ResponseEntity<String> getCompanyByEmail(@RequestParam("email") String email) {
        String company = cliService.getCompanyByEmail(email);
        return ResponseEntity.ok(company);
    }
    @GetMapping("/clientName")
    public ResponseEntity<String> getClientNameByEmail(@RequestParam("email") String email) {
        String name = cliService.getClientNameByEmail(email);
        return ResponseEntity.ok(name);
    }
    @GetMapping("/clientjob")
    public ResponseEntity<String> getClientJobByEmail(@RequestParam("email") String email) {
        String job = cliService.getClientJobByEmail(email);
        return ResponseEntity.ok(job);
    }

    @GetMapping("/client")
    public ResponseEntity<client> getClientByEmail(@RequestParam("email") String email) {
        client cli = cliService.getClientByEmail(email);
        return ResponseEntity.ok(cli);
    }
}
