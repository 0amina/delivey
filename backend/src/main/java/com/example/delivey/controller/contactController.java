package com.example.delivey.controller;

import com.example.delivey.model.colis;
import com.example.delivey.model.contact;
import com.example.delivey.servicesImp.contactServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class contactController {
    @Autowired
    private contactServiceImp contService;
    @PostMapping("contact/add")
    public ResponseEntity<contact> AddContact(@RequestBody contact c){
        contact newl=contService.AddContact(c);
        return new ResponseEntity<>(newl, HttpStatus.CREATED);
    }

    @GetMapping("contact/all")
    public ResponseEntity<List<contact>> listAllCategorys(){
        List<contact> cont = contService.findAllByOrderByCreatedAtAsc();
        return new ResponseEntity<>(cont, HttpStatus.OK);
    }
}
