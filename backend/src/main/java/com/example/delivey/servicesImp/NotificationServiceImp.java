package com.example.delivey.servicesImp;

import com.example.delivey.model.Notification;
import com.example.delivey.model.colis;
import com.example.delivey.repository.NotificationRepo;
import com.example.delivey.repository.clientRepo;
import com.example.delivey.services.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class NotificationServiceImp implements NotificationService {


    @Autowired
    private NotificationRepo notificationRepository;


    @Override
    public List<Notification> listAllNotifications() {
        return notificationRepository.findAll();
    }
}
