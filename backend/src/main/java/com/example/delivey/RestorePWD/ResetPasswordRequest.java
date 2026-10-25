package com.example.delivey.RestorePWD;

import lombok.*;

@Getter
@Setter
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResetPasswordRequest {

    private String email;
    private String baseUrl;
    private String oldPassword;
    private String newPassword;
}
