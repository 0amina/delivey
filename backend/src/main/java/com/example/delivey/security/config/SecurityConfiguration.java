package com.example.delivey.security.config;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;
import lombok.RequiredArgsConstructor;
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity
public class SecurityConfiguration {
    private static final String[] WHITE_LIST_URL = {
            "/api/admin/**",
            "/api/livreur/**",
            "colis/dashboard-counts/**",
            "colis/livdashboard-counts/**",
            "/api/username/**",
            "/api/auth/authenticate/cli",
            "/api/password-reset-request",
            "/api/reset-password",
            "/api/location/getByEmail",
            "/api/location/update",
            "/api/totalpayed/**",
            "/api/totaldept/**",
            "/api/auth/**",
            "/api/contact/**",
            "/api/contact/send",
            "/api/colis/**",
            "/api/coliss/**",
            "/api/Allcolis/dashboard-counts",
            "/api/colissbyemail/**",
            "/api/livreurlist/**",
            "/api/byLivreur/**",
            "/api/find/**",
            "/api/delete/**",
            "/api/update/**",
            "/api/colis/today/**",
            "/api/livreur/**",
            "/api/livreurs/**",
            "/api/client/**",
            "/api/clients/**",
            "/api/clientName/**",
            "/api/clientjob/",
            "/api/company/**",
            "/api/notifications/**",
            "/api/livname/**",
    };
    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
         .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(req ->
                        req.requestMatchers(WHITE_LIST_URL)
                                .permitAll()
                                .anyRequest()
                                .authenticated()
                )
                .sessionManagement(session -> session.sessionCreationPolicy(STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)

        ;

        return http.build();
    }

}

