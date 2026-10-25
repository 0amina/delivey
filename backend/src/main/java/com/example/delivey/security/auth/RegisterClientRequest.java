package com.example.delivey.security.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterClientRequest {

    private String UName;
    private String email;
    private String pass;
    private String job;
    private String company;
    private Long phone;
    private String Industry;
}
