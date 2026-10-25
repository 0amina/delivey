package com.example.delivey.services;

import com.example.delivey.model.Notification;
import com.example.delivey.model.colis;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface NotificationService {
    List<Notification> listAllNotifications();
}

