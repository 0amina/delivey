package com.example.delivey.controller;

import com.example.delivey.model.Notification;
import com.example.delivey.model.client;
import com.example.delivey.model.colis;
import com.example.delivey.repository.NotificationRepo;
import com.example.delivey.repository.colisRepo;
import com.example.delivey.services.AuthService;
import com.example.delivey.services.colisService;
import com.example.delivey.servicesImp.clientServiceImp;
import com.example.delivey.servicesImp.colisServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class colisController {
    @Autowired
    private colisServiceImp colService;
    @Autowired
    private colisRepo colRepo;
    @Autowired
    private NotificationRepo notificationRepository;
    @Autowired
    private com.example.delivey.repository.clientRepo clientRepo;
    @Autowired
    private clientServiceImp clientService;


    @GetMapping("/byLivreur")
    public ResponseEntity<List<colis>> getColisByLivreur(@RequestParam String livreurEmail) throws Exception {
        List<colis> colisList = colService.getColisByLivreurAddress(livreurEmail);

        if (!colisList.isEmpty()) {
            return new ResponseEntity<>(colisList, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PutMapping("/livreur/{colisId}/status")
    public void updateColisStatus(@PathVariable Long colisId, @RequestBody String newStatus) {
        // Remove leading and trailing spaces, and remove quotes
        String trimmedStatus = newStatus.trim().replace("\"", "");

        // Your logic to update the colis status
        colService.updateColisStatus(colisId, trimmedStatus);
    }



    @GetMapping("/livreurlist")
    public ResponseEntity<List<colis>> findAllColisBylivreur(@RequestParam String livreurEmail) throws Exception {
        List<colis> colisList = colService.findAllColisBylivreur(livreurEmail);

        if (!colisList.isEmpty()) {
            return new ResponseEntity<>(colisList, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @PostMapping("/colis/add")
    public ResponseEntity<colis> AddColis(@RequestParam("email") String email, @RequestBody colis col) {
        String clientId = clientService.getClientIdByEmail(email);
        if (clientId != null) {
            col.setClientEmail(email);
            client client = clientRepo.findById(Integer.valueOf(clientId)).orElse(null);
            if (client != null) {
                col.setClient(client);
                colis newcol = colService.AddColis(col);
                Notification notification = new Notification();
                notification.setMessage("A new package has been added by client: " + email);
                notificationRepository.save(notification);
                return new ResponseEntity<>(newcol, HttpStatus.CREATED);
            }
        }
        return ResponseEntity.notFound().build();
    }
    @GetMapping("/colissbyemail")
    public ResponseEntity<List<colis>> listColisByClientEmail(@RequestParam("email") String email) {
        String clientId = clientService.getClientIdByEmail(email);
        if (clientId != null) {
            List<colis> coliss = colService.findByClientIdOrderByCreatedAtAsc(clientId);
            return new ResponseEntity<>(coliss, HttpStatus.OK);
        }
        return ResponseEntity.notFound().build();
    }
    @GetMapping("colis/livdashboard-counts")
    public ResponseEntity<Map<String, Integer>> getLivreurColisDashboardCounts(@RequestParam("email") String email) {
        Map<String, Integer> counts = new HashMap<>();
        int totalCount = colService.count();
        int enCoursCount = colService.getLivreurColisCountByStatus("pending", email);
        int retourCount = colService.getLivreurColisCountByStatus("returned", email);
        int livreCount = colService.getLivreurColisCountByStatus("delivered", email);
        int livrePayeCount = colService.getLivreurColisCountByStatus("delivered payed", email);
        int echangeCount = colService.getLivreurColisCountByEchange("oui", email);

        counts.put("totalCount", totalCount);
        counts.put("enCoursCount", enCoursCount);
        counts.put("retourCount", retourCount);
        counts.put("livreCount", livreCount);
        counts.put("livrePayeCount", livrePayeCount);
        counts.put("echangeCount", echangeCount);

        return new ResponseEntity<>(counts, HttpStatus.OK);
    }
    @GetMapping("colis/dashboard-counts")
    public ResponseEntity<Map<String, Integer>> getColisDashboardCounts(@RequestParam("email") String email) {
        Map<String, Integer> counts = new HashMap<>();
        int totalCount = colService.count();
        int enCoursCount = colService.getColisCountByStatus("pending", email);
        int retourCount = colService.getColisCountByStatus("returned", email);
        int livreCount = colService.getColisCountByStatus("delivered", email);
        int livrePayeCount = colService.getColisCountByStatus("delivered payed", email);
        int echangeCount = colService.getColisCountByEchange("oui", email);

        counts.put("totalCount", totalCount);
        counts.put("enCoursCount", enCoursCount);
        counts.put("retourCount", retourCount);
        counts.put("livreCount", livreCount);
        counts.put("livrePayeCount", livrePayeCount);
        counts.put("echangeCount", echangeCount);

        return new ResponseEntity<>(counts, HttpStatus.OK);
    }
    @GetMapping("Allcolis/dashboard-counts")
    public ResponseEntity<Map<String, Integer>> getColisDashboardCounts() {
        Map<String, Integer> counts = new HashMap<>();
        int totalCount = colService.count();
        int enCoursCount = colService.getColisCountByStatus("pending");
        int retourCount = colService.getColisCountByStatus("returned");
        int livreCount = colService.getColisCountByStatus("delivered");
        int livrePayeCount = colService.getColisCountByStatus("delivered payed");

        counts.put("totalCount", totalCount);
        counts.put("enCoursCount", enCoursCount);
        counts.put("retourCount", retourCount);
        counts.put("livreCount", livreCount);
        counts.put("livrePayeCount", livrePayeCount);


        return new ResponseEntity<>(counts, HttpStatus.OK);
    }
    @GetMapping("/coliss")
    public ResponseEntity<List<colis>> listAllCategorys(){
        List<colis> coliss = colService.findAllByOrderByCreatedAtAsc();
        return new ResponseEntity<>(coliss, HttpStatus.OK);
    }



    @GetMapping("/find/{idColis}")
    public ResponseEntity<colis> getColisById(@PathVariable("idColis") Long idColis){
        colis col = colService.getColisById(idColis);
        return new ResponseEntity<>(col,HttpStatus.OK);
    }
    @DeleteMapping("/delete/{idColis}")
    public ResponseEntity<?> deleteColis(@PathVariable("idColis") Long idColis){
        colService.deleteColis(idColis);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @PutMapping("/update/{idColis}")
    public ResponseEntity<colis> updateCategory(@PathVariable("idColis") long idColis, @RequestBody colis coli) {
        Optional<colis> catt = colRepo.findById(idColis);
        if (catt.isPresent()) {
            colis cat = catt.get();
            cat.setClientName(coli.getClientName());
            cat.setClientAdress(coli.getClientAdress());
            cat.setClientNumber(coli.getClientNumber());
            cat.setClientCitie(coli.getClientCitie());
            cat.setClientState(coli.getClientState());
            cat.setExchange(coli.getExchange());
            cat.setFragil(coli.getFragil());
            cat.setMsg(coli.getMsg());
            cat.setType(coli.getType());
            cat.setNbPiece(coli.getNbPiece());
            cat.setWeight(coli.getWeight());
            cat.setPrice(coli.getPrice());
            cat.setStatus(coli.getStatus());

            // Check if coli.getClient() is not null before updating the association
            if (coli.getClient() != null) {
                cat.setClient(coli.getClient());
            }

            return new ResponseEntity<>(colRepo.save(cat), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    /* @GetMapping("/coliss")
    public ResponseEntity<List<colis>> listAllColis() {
        LocalDate today = LocalDate.now();
        List<colis> coliss = colService.findByCreatedAt(today);
        return new ResponseEntity<>(coliss, HttpStatus.OK);
    }*/
   @GetMapping("/colis/today")
   public List<colis> getColisForToday() {
       return colService.getColisForToday();
   }


    @PutMapping("/admin/{colisId}/etat")
    public ResponseEntity<String> updateColisEtat(@PathVariable Long colisId, @RequestBody String newStatus) {
        try {
            colService.updateColisEtat(colisId, newStatus);
            return new ResponseEntity<>("Colis etat updated successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to update colis etat", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @GetMapping("/colis/{status}")
    public List<colis> getColisByStatus(@PathVariable String status) {
        return colService.findAllColisByStatus(status);
    }

    @GetMapping("/totaldept")
    public ResponseEntity<Float> getTotalDept(@RequestParam("email") String email) {
        String etat = "not payed";
        Float totalDept = colService.getTotalDept(email, etat);
        return ResponseEntity.ok(totalDept);
    }


    @GetMapping("/totalpayed")
    public ResponseEntity<Float> getTotalPayed(@RequestParam("email") String email) {
        String status = "delivered";
        String etat = "payed";
        Float totalPayed = colService.gettotalpayed(email, status, etat);
        return ResponseEntity.ok(totalPayed);
    }
    @GetMapping("client/colis/{status}")
    public List<colis> getColisByStatus(@PathVariable String status, @RequestParam("email") String email)
    {
        return colService.findClientColisByStatus(status,email);
    }
    @PutMapping("/colis/updateLivreur")
    public ResponseEntity<String> updateLivreur(@RequestParam Long idColis, @RequestParam String livreur) {
        try {
            colService.updateLivreur(idColis, livreur);
            return new ResponseEntity<>("Livreur updated successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to update livreur", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
