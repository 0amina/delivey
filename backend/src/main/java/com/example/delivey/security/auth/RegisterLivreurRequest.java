package com.example.delivey.security.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterLivreurRequest {

    private String UName;
    private String email;
    private String pass;
    private String position;
    private String address;
    private Long phone;
}
