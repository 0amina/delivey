package com.example.delivey.RestorePWD;

import com.example.delivey.model.client;
import lombok.Getter;
import lombok.Setter;
import org.springframework.context.ApplicationEvent;

@Getter
@Setter
public class RegistrationCompleteEvent extends ApplicationEvent {
    private client user;
    private String applicationUrl;

    public RegistrationCompleteEvent(client user, String applicationUrl) {
        super(user);
        this.user = user;
        this.applicationUrl = applicationUrl;
    }
}
