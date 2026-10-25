package com.example.delivey.servicesImp;

import com.example.delivey.model.admin;
import com.example.delivey.model.client;
import com.example.delivey.model.livreur;
import com.example.delivey.repository.adminRepo;
import com.example.delivey.repository.clientRepo;
import com.example.delivey.repository.livRepo;
import com.example.delivey.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/*@Service
public class AuthServiceImpl implements AuthService {
    @Autowired
    private clientRepo clientRep;
    @Autowired
    private livRepo livRep;
    @Autowired
    private adminRepo adminRep;
    @Override
    public client authenticateclient(String email, String password) {
        client c = clientRep.findByEmail(email);
        if (c != null && password.equals(c.getPass())) {
            return c;
        }
        return null;
    }

    @Override
    public livreur authenticateliv(String email, String password) {
       livreur l = livRep.findByEmail(email);
        if (l != null && password.equals(l.getPass())) {
            return l;
        }
        return null;
    }

    @Override
    public String getClientIdByEmail(String email) {
        client client = clientRep.findByEmail(email);
        if (client != null) {
            return String.valueOf(client.getClientId());
        }
        return null;
    }

    @Override
    public admin authenticateadmin(String email, String password) {
        admin a = adminRep.findByEmail(email);
        if (a != null && password.equals(a.getPass())) {
            return a;
        }
        return null;
    }
}*/

