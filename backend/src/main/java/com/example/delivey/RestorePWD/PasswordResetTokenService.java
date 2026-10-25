package com.example.delivey.RestorePWD;

import com.example.delivey.RestorePWD.PasswordResetToken;
import com.example.delivey.model.client;
import com.example.delivey.RestorePWD.PasswordResetTokenRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Optional;
@Service
@RequiredArgsConstructor
public class PasswordResetTokenService {

    private final PasswordResetTokenRepository passwordResetTokenRepository;

    @Value("${application.security.jwt.secret-key}")
    private String secretKey;
    public void createPasswordResetTokenForUser(client user, String passwordToken) {
        // Check if a token already exists for the user
        PasswordResetToken existingToken = passwordResetTokenRepository.findByUser(user);

        // If a token exists, update its value and expiration time
        if (existingToken != null) {
            existingToken.setToken(passwordToken);
            existingToken.setExpirationTime(existingToken.getTokenExpirationTime());
            passwordResetTokenRepository.save(existingToken);
        } else {
            // If no token exists, create a new one
            PasswordResetToken passwordResetToken = new PasswordResetToken(passwordToken, user);
            passwordResetTokenRepository.save(passwordResetToken);
        }
    }

    public String validatePasswordResetToken(String passwordResetToken) {

        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(secretKey)
                    .parseClaimsJws(passwordResetToken)
                    .getBody();

            // Add additional checks if needed
            // For example, check if the email matches the user in your system

            return "valid";
        } catch (ExpiredJwtException ex) {
            return "Link already expired, resend link";
        } catch (Exception ex) {
            return "Invalid verification token";
        }
    }
    public Optional<client> findUserByPasswordToken(String passwordResetToken) {
        return Optional.ofNullable(passwordResetTokenRepository.findByToken(passwordResetToken).getUser());
    }

    public PasswordResetToken findPasswordResetToken(String token){
        return passwordResetTokenRepository.findByToken(token);
    }
}
