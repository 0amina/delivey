package com.example.delivey.services;

import com.example.delivey.model.admin;
import com.example.delivey.model.client;
import com.example.delivey.model.livreur;

public interface AuthService {
    client authenticateclient(String email, String password);
    livreur authenticateliv(String email, String password);
    public String getClientIdByEmail(String email);

    admin authenticateadmin(String email, String pass);
}
