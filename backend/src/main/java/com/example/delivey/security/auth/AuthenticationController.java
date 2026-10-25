package com.example.delivey.security.auth;

import com.example.delivey.security.user.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AuthenticationController {

    private final AuthenticationService service;

   /* @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ) {
        return ResponseEntity.ok(service.register(request));
    }*/

   @PostMapping("/register/admin")
    public ResponseEntity<AuthenticationResponse> registerAdmin(
            @RequestBody RgisterAdminRequest request
    ) {
        return ResponseEntity.ok(service.registerAdmin(request));
    }

    @PostMapping("/register/cli")
    public ResponseEntity<AuthenticationResponse> registerClient(
            @RequestBody RegisterClientRequest request
    ) {
        return ResponseEntity.ok(service.registerClient(request));
    }

    @PostMapping("/register/liv")
    public ResponseEntity<AuthenticationResponse> registerLivreur(
            @RequestBody RegisterLivreurRequest request
    ) {
        return ResponseEntity.ok(service.registerLivreur(request));
    }

    /*@PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(service.authenticate(request));
    }*/

    @PostMapping("/authenticate/admin")
    public ResponseEntity<AuthenticationResponse> authenticateadmin(
            @RequestBody AuthenticationRequest request
    ) {

        return ResponseEntity.ok(service.authenticateadmin(request));
    }

    @PostMapping("/authenticate/cli")
    public ResponseEntity<AuthenticationResponse> authenticatecli(
            @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(service.authenticatecli(request));
    }

    @PostMapping("/authenticate/liv")
    public ResponseEntity<AuthenticationResponse> authenticateliv(
            @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(service.authenticatelivreur(request));
    }




}
