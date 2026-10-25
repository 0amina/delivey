package com.example.delivey.repository;

import com.example.delivey.model.client;
import com.example.delivey.model.colis;
import com.example.delivey.model.contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface contactRepo extends JpaRepository<contact,Long> {
    @Query(value="SELECT * FROM contact ORDER BY created_at DESC", nativeQuery = true)
    List<contact> findAllByOrderByCreatedAtAsc();
}
