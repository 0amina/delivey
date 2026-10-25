package com.example.delivey.repository;

import com.example.delivey.model.client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface clientRepo extends JpaRepository<client,Integer> {
    @Query(value="select * from client where email=:email",nativeQuery = true)
    client findClientByEmail(String email);
    @Query(value="select * from client where uname=:clientname",nativeQuery = true)
    Optional<client>findByUsername(String clientname);
    @Query("SELECT c.company FROM client c WHERE c.email = :email")
    String findCompanyNameByEmail(@Param("email") String email);
    @Query("SELECT c.UName FROM client c WHERE c.email = :email")
    String findClientNameByEmail(@Param("email") String email);

    @Query("SELECT c.job FROM client c WHERE c.email = :email")
    String findClientJobByEmail(@Param("email") String email);

    Optional<client> findByEmail(String email);

}
