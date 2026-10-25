package com.example.delivey.controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import jakarta.servlet.http.HttpServletResponse;

@RestController
public class CSPController {

    @GetMapping("/csp")
    public void getCSP(HttpServletResponse response) {
        response.setHeader("Content-Security-Policy", "default-src 'none'; font-src 'self' http://localhost:3000;");
    }

}
