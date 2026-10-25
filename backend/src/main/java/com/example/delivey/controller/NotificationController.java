package com.example.delivey.controller;

import com.example.delivey.model.Notification;
import com.example.delivey.model.colis;
import com.example.delivey.repository.NotificationRepo;
import com.example.delivey.services.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class NotificationController {
    @Autowired
    private NotificationService notificationService;
    @GetMapping("notifications/latest")
    public ResponseEntity<List<Notification>> listAllNotifications(){
        List<Notification> Notification = notificationService.listAllNotifications();
        return new ResponseEntity<>(Notification, HttpStatus.OK);
    }

}
