package com.example.delivey.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.example.delivey.servicesImp.adminServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class adminController {

    private static final Logger logger = LoggerFactory.getLogger(adminController.class);


    private adminServiceImp emailService;
    @Autowired
    public adminController(adminServiceImp emailService) {
        this.emailService = emailService;
    }

    @PostMapping("contact/send")
    public String sendMail(@RequestBody EmailRequest emailRequest) {
        String to = emailRequest.getTo();
        String[] cc = emailRequest.getCc();
        String subject = emailRequest.getSubject();
        String body = emailRequest.getBody();

        if (to == null || to.isEmpty()) {
            return "To address must not be null or empty";
        }
        try {
            String result = emailService.sendMail(to, cc, subject, body);
            logger.info("Email sent successfully to: {}", to);
            return result;
        } catch (Exception e) {
            logger.error("Error sending email to {}: {}", to, e.getMessage(), e);
            return "Error sending email";
        }


    }


}
