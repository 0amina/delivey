package com.example.delivey.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import java.util.Set;

@Entity
public class colis_type {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long IdType;
    @Column(name="NomType")
    private String NomType;

    public colis_type(Long idType, String nomType) {
        IdType = idType;
        NomType = nomType;
    }
    @JsonIgnore

    public colis_type(){}

    public Long getIdType() {
        return IdType;
    }

    public void setIdType(Long idType) {
        IdType = idType;
    }

    public String getNomType() {
        return NomType;
    }

    public void setNomType(String nomType) {
        NomType = nomType;
    }
}
