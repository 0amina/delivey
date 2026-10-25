package com.example.delivey.RestorePWD;


import com.example.delivey.RestorePWD.PasswordResetToken;
import com.example.delivey.model.client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    @Query(value="select * from password_reset_token where token=:passwordResetToken",nativeQuery = true)
    PasswordResetToken findByToken(String passwordResetToken);


    PasswordResetToken findByUser(client user);
}
