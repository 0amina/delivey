package com.example.delivey.repository;

import com.example.delivey.model.admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface adminRepo extends JpaRepository<admin, Integer> {

    /*@Query(value="select * from admin where email=:email",nativeQuery = true)
    admin findByEmail(String email);*/

    Optional<admin> findByEmail(String email);
}
