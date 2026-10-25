package com.example.delivey.controller;
import com.example.delivey.model.UserLocation;
import com.example.delivey.repository.UserLocationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/location")
public class LocationController {

    private final UserLocationRepo locationRepository;

    @Autowired
    public LocationController(UserLocationRepo locationRepository) {
        this.locationRepository = locationRepository;
    }

    @PutMapping("/update")
    public void updateLocation(@RequestBody UserLocation location) {
        try {
            // Check if a location already exists for the user
            Optional<UserLocation> existingLocation = locationRepository.findByEmail(location.getEmail());

            if (existingLocation.isPresent()) {
                // Update the existing location
                UserLocation oldLocation = existingLocation.get();
                oldLocation.setLatitude(location.getLatitude());
                oldLocation.setLongitude(location.getLongitude());
                locationRepository.save(oldLocation);
                System.out.println("Location updated successfully.");
            } else {
                // Save the new location if it doesn't exist
                locationRepository.save(location);
                System.out.println("Location saved successfully.");
            }
        } catch (Exception e) {
            System.err.println("Error updating/saving location: " + e.getMessage());
            e.printStackTrace();
        }
    }

    @GetMapping("/getByEmail")
    public ResponseEntity<List<UserLocation>> getLocationByEmail(@RequestParam String email) {
        try {
            List<UserLocation> userLocations = locationRepository.findUserLocation(email);

            if (!userLocations.isEmpty()) {
                return new ResponseEntity<>(userLocations, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            System.err.println("Error getting location by email: " + e.getMessage());
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
