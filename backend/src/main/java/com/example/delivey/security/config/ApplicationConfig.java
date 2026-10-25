package com.example.delivey.security.config;

import com.example.delivey.repository.adminRepo;
import com.example.delivey.repository.clientRepo;
import com.example.delivey.repository.livRepo;
import com.example.delivey.security.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;


@Configuration
@RequiredArgsConstructor
public class ApplicationConfig {

    private final adminRepo repository;
    private final clientRepo repocli;
    private final livRepo repoliv;


    @Bean
    public UserDetailsService userDetailsService() {
        return username -> {
            if (username.contains("admin")) {
                return repository.findByEmail(username)
                        .orElseThrow(() -> new UsernameNotFoundException("Admin not found"));
            } else if (username.contains("client")) {
                return repocli.findByUsername(username)
                        .orElseThrow(() -> new UsernameNotFoundException("Client not found"));
            } else if (username.contains("livreur")) {
                return repoliv.findByUsername(username)
                        .orElseThrow(() -> new UsernameNotFoundException("Livreur not found"));
            } else {
                throw new UsernameNotFoundException("User not found");
            }
        };
    }
    /*public UserDetailsService adminDetailsService() {
        return username -> repository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }
    @Bean
    public UserDetailsService clientDetailsService() {
        return username -> repocli.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    @Bean
    public UserDetailsService livreurDetailsService() {
        return username -> repoliv.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }*/

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    /*@Bean
    public AuthenticationProvider adminauthenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(adminDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationProvider clientauthenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(clientDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationProvider livreurauthenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(livreurDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }*/



    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
