package com.example.delivey.services;



import com.example.delivey.model.admin;

import java.util.Optional;

public interface adminService {
    Optional<admin> findByEmailAndPassword(String email, String password);
}
