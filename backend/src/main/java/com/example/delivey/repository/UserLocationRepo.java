package com.example.delivey.repository;

import com.example.delivey.model.UserLocation;
import com.example.delivey.model.colis;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserLocationRepo extends JpaRepository<UserLocation, Long> {
    @Query(value = "SELECT l FROM UserLocation l WHERE l.email = :Email")
    List<UserLocation> findUserLocation(@Param("Email") String Email);
        Optional<UserLocation> findByEmail(String email);


}


