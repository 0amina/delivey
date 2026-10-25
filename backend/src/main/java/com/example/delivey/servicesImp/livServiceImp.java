package com.example.delivey.servicesImp;


import com.example.delivey.dto.LivreurDto;
import com.example.delivey.model.client;
import com.example.delivey.model.livreur;

import com.example.delivey.repository.livRepo;
import com.example.delivey.services.livService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class livServiceImp implements livService {
    @Autowired
    private livRepo livRepo;

    /*public client getClientByEmail(String email) {
        return livRepo.findClientByEmail(email);
    }*/
    @Override
    public livreur AddLivreur(livreur l) {
        return livRepo.save(l);

    }

    public ResponseEntity<String> deleteLivreur(Integer livreurId) {
        Optional<livreur> optionalLivreur = livRepo.findById(livreurId);
        if (optionalLivreur.isPresent()) {
            livRepo.deleteById(livreurId);
            return new ResponseEntity<>("Livreur deleted successfully", HttpStatus.OK);
        }
        return new ResponseEntity<>("Livreur not found", HttpStatus.NOT_FOUND);
    }

    public List<livreur> getAllLivreurs() {
        return livRepo.findAll();
    }


    public livreur getLivreurById(Integer livreurId) {
        Optional<livreur> optionalLivreur = livRepo.findById(livreurId);
        return optionalLivreur.orElse(null);
    }

    public livreur getLivByEmail(String email) {
        return livRepo.findLivreurByEmail(email);
    }


    /*public livreur updateLivreur(Integer livreurId, LivreurDto livreurDto) {
        Optional<livreur> optionalLivreur = livRepo.findById(livreurId);
        if (optionalLivreur.isPresent()) {
            livreur existingLivreur = optionalLivreur.get();
            if (livreurDto.getUName() != null) {
                existingLivreur.setUName(livreurDto.getUName());
            }
            if (livreurDto.getEmail() != null) {
                existingLivreur.setEmail(livreurDto.getEmail());
            }
            if (livreurDto.getPass() != null) {
                existingLivreur.setPass(livreurDto.getPass());
            }
            if (livreurDto.getPosition() != null) {
                existingLivreur.setPosition(livreurDto.getPosition());
            }
            if (livreurDto.getPhone() != null) {
                existingLivreur.setPhone(livreurDto.getPhone());
            }
            return livRepo.save(existingLivreur);
        }
        return null;
    }*/
}
