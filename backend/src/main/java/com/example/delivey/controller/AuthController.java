package com.example.delivey.controller;
import com.example.delivey.model.admin;
import com.example.delivey.model.client;
import com.example.delivey.model.livreur;
import com.example.delivey.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletRequest;


/*@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AuthController {
    @Autowired
    private AuthService authService;
    @Autowired
    private HttpServletRequest request;


    @PostMapping("client/login")
    public ResponseEntity<client> login(@RequestBody client c) {
        client authenticatedUser = authService.authenticateclient(c.getEmail(), c.getPass());
        if (authenticatedUser != null) {
            String returnUrl = "/client?email=" + c.getEmail(); // Modify the URL as per your requirements
            return ResponseEntity.ok().header("Location", returnUrl).body(authenticatedUser);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @PostMapping("liv/login")
    public ResponseEntity<livreur> login(@RequestBody livreur l) {
        livreur authenticatedUser = authService.authenticateliv(l.getEmail(), l.getPass());
        if (authenticatedUser != null) {
            String returnUrl = "/liv?email=" + l.getEmail(); // Modify the URL as per your requirements
            return ResponseEntity.ok().header("Location", returnUrl).body(authenticatedUser);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @PostMapping ("admin/login")
    public ResponseEntity<admin> login(@RequestBody admin a) {
        admin authenticatedUser = authService.authenticateadmin(a.getEmail(), a.getPass());
        if (authenticatedUser != null) {
            return ResponseEntity.ok(authenticatedUser);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

}*/

