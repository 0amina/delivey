package com.example.delivey.services;

import com.example.delivey.model.client;
import com.example.delivey.model.colis;

import java.time.LocalDate;
import java.util.List;

public interface colisService {

    colis AddColis(colis col);
    colis getColisById(Long idColis);
    void deleteColis(Long idColis);
    List<colis> findbytitle(String title);

    List<colis> findAllByOrderByCreatedAtAsc();
    List<colis> findByClientId(String clientId);
    List<colis> findByClientIdOrderByCreatedAtAsc(String clientId);
    int getColisCountByStatus(String status, String clientEmail);
    int getColisCountByEchange(String echange, String clientEmail);
    int getColisCountByStatus(String status);
    Float getTotalDept(String clientEmail, String etat);

    Float gettotalpayed(String clientEmail, String status, String etat);
    void updateColisEtat(Long colisId, String newEtat);
    List<colis> getcolisnotdelivered(String clientEmail);
    }
