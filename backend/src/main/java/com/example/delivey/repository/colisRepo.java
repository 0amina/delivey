package com.example.delivey.repository;

import com.example.delivey.model.colis;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public interface colisRepo extends JpaRepository<colis,Long> {

    @Query(value = "SELECT * FROM colis WHERE client_state = :address AND (livreur IS NULL OR livreur = '') ORDER BY created_at DESC", nativeQuery = true)
    List<colis> findByLivreurAddress(String address);



    @Query(value = "SELECT * FROM colis WHERE livreur= :email ORDER BY created_at DESC", nativeQuery = true)
    List<colis> findByLivreur(@Param("email") String email);

    @Query(value="select * from category where title=:name",nativeQuery = true)
    List<colis> findbytitle(String name);
    @Query(value="SELECT * FROM colis ORDER BY created_at DESC", nativeQuery = true)
    List<colis> findAllByOrderByCreatedAtAsc();
    @Query(value="select * from colis where user_id=:clientId",nativeQuery = true)
    List<colis> findByClientEmailOrderByCreatedAtAsc(String clientId);
    @Query(value = "SELECT COUNT(*) FROM colis WHERE status = :status AND client_email = :clientEmail", nativeQuery = true)
    int getColisCountByStatusAndClientEmail(String status, String clientEmail);
    @Query(value = "SELECT COUNT(*) FROM colis WHERE status = :status AND livreur = :livreurEmail", nativeQuery = true)
    int getColisCountByStatusAndLivreurEmail(String status, String livreurEmail);
    @Query(value = "SELECT COUNT(*) FROM colis WHERE exchange = :echange AND livreur = :livreurEmail", nativeQuery = true)
    int getColisCountByEchangeAndLivreurEmail(String echange,String livreurEmail);
    @Query(value = "SELECT COUNT(*) FROM colis WHERE exchange = :echange AND client_email = :clientEmail", nativeQuery = true)
    int getColisCountByEchangeAndClientEmail(String echange,String clientEmail);
    @Query("SELECT c FROM colis c WHERE Date(c.createdAt) = :date ORDER BY c.IdColis ASC")
    List<colis> findByCreatedAt(@Param("date") Date date);


    @Query("SELECT c FROM colis c WHERE c.status = :status")
    List<colis> findAllByStatus(@Param("status") String status);
    @Query(value = "SELECT COUNT(*) FROM colis WHERE status = :status ", nativeQuery = true)
    int getColisCountByStatus(String status);
    @Query(value = "SELECT SUM(c.price) FROM colis c WHERE c.etat = :etat AND c.client_email = :clientEmail", nativeQuery = true)
    Float getTotalDept(
            @Param("clientEmail") String clientEmail,
            @Param("etat") String etat
    );
    @Query(value = "SELECT SUM(c.price) FROM colis c WHERE c.status = :status AND c.etat = :etat AND c.client_email = :clientEmail", nativeQuery = true)
    Float gettotalpayed(
            @Param("clientEmail") String clientEmail,
            @Param("status") String status,
            @Param("etat") String etat
    );

    @Query("SELECT c FROM colis c WHERE c.status = :status AND c.clientEmail = :clientEmail")
    List<colis> findClientByStatus(@Param("status") String status, String clientEmail);

    @Query(value = "SELECT c FROM colis c WHERE c.clientEmail = :clientEmail AND c.status <> 'delivered'")
    List<colis> findNotDeliveredByClientEmail(@Param("clientEmail") String clientEmail);


}
