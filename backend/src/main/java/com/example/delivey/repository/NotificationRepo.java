package com.example.delivey.repository;

import com.example.delivey.model.Notification;
import com.example.delivey.model.colis;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface NotificationRepo extends JpaRepository<Notification,Long> {

}
