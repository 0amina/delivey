package com.example.delivey.security.auth;

import com.example.delivey.repository.livRepo;
import com.example.delivey.repository.adminRepo;
import com.example.delivey.repository.clientRepo;
import com.example.delivey.security.config.JwtService;
import com.example.delivey.security.user.Role;
//import com.example.delivey.security.user.User;
import com.example.delivey.model.livreur;
import com.example.delivey.model.client;
import com.example.delivey.model.admin;
//import com.example.delivey.security.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class AuthenticationService {
    //private final UserRepository repository;
    private final livRepo repoliv;
    private final adminRepo repoadmin;
    private final clientRepo repocli;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    /*public AuthenticationResponse register(RegisterRequest request) {
        var user = User.builder()
                .UserName(request.getUserName())
                .email(request.getEmail())
                .pass(passwordEncoder.encode(request.getPass()))
                .role(Role.USER)
                .build();
        repository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }*/
    public AuthenticationResponse registerAdmin(RgisterAdminRequest request) {
        admin admin1 = admin.builder()
                .UName(request.getUName())
                .email(request.getEmail())
                .pass(passwordEncoder.encode(request.getPass()))
                .role(Role.ADMIN)
                .build();
        repoadmin.save(admin1);
        var jwtToken = jwtService.generateToken(admin1);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse registerLivreur(RegisterLivreurRequest request) {
        livreur livreur1 = livreur.builder()
                .UName(request.getUName())
                .email(request.getEmail())
                .pass(passwordEncoder.encode(request.getPass()))
                .position(request.getPosition())
                .address(request.getAddress())
                .phone(request.getPhone())
                .role(Role.LIVREUR)
                .build();

        // Create the Livreur object separately and set additional attributes
        /*livreur livreurEntity = new livreur(
                livreur1.getUserId(),
                livreur1.getUName(),
                livreur1.getEmail(),
                livreur1.getPass(),
                request.getPosition(),
                request.getPhone(),
                livreur1.getRole()
        );*/
        //repository.save(livreur1);
        repoliv.save(livreur1);

        var jwtToken = jwtService.generateToken(livreur1);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
    public AuthenticationResponse registerClient(RegisterClientRequest request) {
        client cli = client.builder()
                .UName(request.getUName())
                .email(request.getEmail())
                .pass(passwordEncoder.encode(request.getPass()))
                .job(request.getJob())
                .company(request.getCompany())
                .phone(request.getPhone())
                .Industry(request.getIndustry())
                .role(Role.CLIENT)
                .build();
        repocli.save(cli);
        var jwtToken = jwtService.generateToken(cli);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }


   /* public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPass()
                )
        );
        var user = repository.findByEmail(request.getEmail())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }*/

    public AuthenticationResponse authenticatecli(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUName(),
                        request.getPass()
                )
        );
        var client1 = repocli.findByUsername(request.getUName())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(client1);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticateadmin(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUName(),
                        request.getPass()
                )
        );
        var adminn = repoadmin.findByEmail(request.getUName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        var jwtToken = jwtService.generateToken(adminn);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticatelivreur(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUName(),
                        request.getPass()
                )
        );
        var liv = repoliv.findByUsername(request.getUName())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(liv);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }


}
