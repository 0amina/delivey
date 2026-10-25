package com.example.delivey.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long  Id;
    private String Message;
    private Date Date;
    private String loggedInUser;
    public Notification(String message, Date date,Long id) {
        Id=id;
        Message = message;
        Date = date;

    }
    public Notification(String message,Date date, String loggedInUser) {
        Message = message;
        this.loggedInUser = loggedInUser;
        Date = date;
    }

    public String getLoggedInUser() {
        return loggedInUser;
    }

    public void setLoggedInUser(String loggedInUser) {
        this.loggedInUser = loggedInUser;
    }

    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        Id = id;
    }

    public Notification(){}

    public String getMessage() {
        return Message;
    }

    public void setMessage(String message) {
        Message = message;
    }

    public Date getDate() {
        return Date;
    }
    @PrePersist
    public void setDate() {
        Date =new  Date();
    }
}
