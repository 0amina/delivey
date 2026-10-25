package com.example.delivey.repository;


import com.example.delivey.model.client;
import com.example.delivey.model.livreur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface livRepo extends JpaRepository<livreur,Integer> {
    @Query(value="select * from livreur where email=:email",nativeQuery = true)
    livreur findLivreurByEmail(String email);

    Optional<livreur> findByEmail(String email);
    @Query(value="select * from livreur where UName=:livname",nativeQuery = true)
    Optional<livreur>findByUsername(String livname);


    @Query(value="select * from livreur where email=:email",nativeQuery = true)
    client findLivByEmail(String email);
}
