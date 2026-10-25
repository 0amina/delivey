package com.example.delivey.servicesImp;

import com.example.delivey.RestorePWD.PasswordResetTokenService;
import com.example.delivey.RestorePWD.VerificationToken;
import com.example.delivey.RestorePWD.VerificationTokenRepository;
import com.example.delivey.dto.clientDto;
import com.example.delivey.model.client;
import com.example.delivey.repository.clientRepo;
import com.example.delivey.security.auth.ChangePasswordRequest;
import com.example.delivey.services.AuthService;
import com.example.delivey.services.clientService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

import jakarta.transaction.Transactional;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class clientServiceImp implements clientService {
    private final PasswordEncoder passwordEncoder;

    @Autowired
   private clientRepo cliRepo;
    @Autowired
    private VerificationTokenRepository tokenRepository;
    private final PasswordResetTokenService passwordResetTokenService;



    public void saveUserVerificationToken(client theUser, String token) {
        var verificationToken = new VerificationToken();
        tokenRepository.save(verificationToken);
    }

    public String validatePasswordResetToken(String token) {
        return passwordResetTokenService.validatePasswordResetToken(token);
    }

    public void resetPassword(client theUser, String newPassword) {
        theUser.setPass(passwordEncoder.encode(newPassword));
        cliRepo.save(theUser);
    }

    public client findUserByPasswordToken(String token) {
        return passwordResetTokenService.findUserByPasswordToken(token).get();
    }
    public void changePassword(client theUser, String newPassword) {
        theUser.setPass(passwordEncoder.encode(newPassword));
        cliRepo.save(theUser);
    }
    public Optional<client> findByEmail(String email) {
        return cliRepo.findByEmail(email);
    }

    public void createPasswordResetTokenForUser(client user, String passwordResetToken) {
        passwordResetTokenService.createPasswordResetTokenForUser(user, passwordResetToken);
    }
    public boolean oldPasswordIsValid(client user, String oldPassword){
        return passwordEncoder.matches(oldPassword, user.getPass());
    }

    @Override
    public client AddClient(client c) {
        return cliRepo.save(c);
    }


    public void changePassword(ChangePasswordRequest request, Principal connectedUser) {

        if (!(connectedUser instanceof UsernamePasswordAuthenticationToken)) {
            throw new IllegalArgumentException("Invalid authentication token");
        }

        client client = (client) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();

        // Check if the current password is correct
        if (!passwordEncoder.matches(request.getCurrentPassword(), client.getPass())) {
            throw new IllegalArgumentException("Incorrect current password");
        }

        // Check if the new passwords match
        if (!request.getNewPassword().equals(request.getConfirmationPassword())) {
            throw new IllegalArgumentException("New passwords do not match");
        }

        // Update and save the new password
        client.setPass(passwordEncoder.encode(request.getNewPassword()));
        cliRepo.save(client);

    }

    public String getClienttIdByEmaill(String email) {
        client client1 = cliRepo.findClientByEmail(email);
        if (client1 != null) {
            return String.valueOf(client1.getUserId());
        }
        return null;
    }
    public client updateClient( String email,clientDto clientDto) {
        Integer clientId = Integer.parseInt(getClienttIdByEmaill(email));
        Optional<client> optionalClient = cliRepo.findById(clientId);
        if (optionalClient.isPresent()) {
            client existingClient = optionalClient.get();
            if (clientDto.getUName() != null) {
                existingClient.setUName(clientDto.getUName());
            }
            if (clientDto.getEmail() != null) {
                existingClient.setEmail(clientDto.getEmail());
            }
            if (clientDto.getJob() != null) {
                existingClient.setJob(clientDto.getJob());
            }
            if (clientDto.getCompany() != null) {
                existingClient.setCompany(clientDto.getCompany());
            }
            if (clientDto.getPassword() != null) {
                existingClient.setPass(clientDto.getPassword());
            }
            if (clientDto.getPhone() != null) {
                existingClient.setPhone(clientDto.getPhone());
            }
            if (clientDto.getIndustry() != null) {
                existingClient.setIndustry(clientDto.getIndustry());
            }

            return cliRepo.save(existingClient);
        }
        return null;
    }


    public ResponseEntity<String> deleteClient(Integer clientId) {
        Optional<client> optionalClient = cliRepo.findById(clientId);
        if (optionalClient.isPresent()) {
            cliRepo.deleteById(clientId);
            return new ResponseEntity<>("Client deleted successfully", HttpStatus.OK);
        }
        return new ResponseEntity<>("Client not found", HttpStatus.NOT_FOUND);
    }


    public List<client> getAllClients() {
        return cliRepo.findAll();
    }


    public client getClientById(Integer clientId) {
        Optional<client> optionalClient = cliRepo.findById(clientId);
        return optionalClient.orElse(null);
    }

    public String getClientIdByEmail(String email) {
        client client = cliRepo.findClientByEmail(email);
        if (client != null) {
            return String.valueOf(client.getUserId());
        }
        return null;
    }
    public String getCompanyByEmail(String email) {
        return cliRepo.findCompanyNameByEmail(email);
    }
    public String getClientNameByEmail(String email) {
        return cliRepo.findClientNameByEmail(email);
    }
    public String getClientJobByEmail(String email) {
        return cliRepo.findClientJobByEmail(email);
    }
    public client getClientByEmail(String email) {
        return cliRepo.findClientByEmail(email);
    }
}






