package com.example.delivey.model;


import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter

public class colis {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long IdColis;
    private Float price;
    private Long nbPiece;
    private String msg;
    private Long Weight;
    private String Type;
    private String fragil;
    private String exchange;
    private String clientName;
    private Long clientNumber;
    private String clientState;
    private String clientCitie;
    private String clientAdress;
    private String status;
    private String clientEmail;
    @CreationTimestamp
    private LocalDateTime createdAt;
    private String etat;
    private String livreur;

    @ManyToOne
    @JoinColumn(name = "UserId")
    private client client;


    public colis(){}

    public colis(Long idColis, Float price, Long nbPiece, String msg, Long weight, String type, String fragil, String exchange, String clientName, Long clientNumber, String clientState, String clientCitie, String clientAdress, String status, client client, colis_type colis_type, LocalDateTime date,String clientemail,String etat,String livreur) {
        IdColis = idColis;
        this.price = price;
        this.nbPiece = nbPiece;
        this.msg = msg;
        Weight = weight;
        Type = type;
        this.fragil = fragil;
        this.exchange = exchange;
        this.clientName = clientName;
        this.clientNumber = clientNumber;
        this.clientState = clientState;
        this.clientCitie = clientCitie;
        this.clientAdress = clientAdress;
        this.status = status;
        this.client = client;
        createdAt=date;
        clientEmail=clientemail;
        this.etat=etat;
        this.livreur=livreur;
    }

}


