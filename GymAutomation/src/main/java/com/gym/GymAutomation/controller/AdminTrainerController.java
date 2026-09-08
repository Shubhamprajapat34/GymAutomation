package com.gym.GymAutomation.controller;

import com.gym.GymAutomation.entity.Trainer;
import com.gym.GymAutomation.dto.AuthResponse;
import com.gym.GymAutomation.dto.RegisterRequest;
import com.gym.GymAutomation.service.AuthService;
import com.gym.GymAutomation.service.TrainerService;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/trainers")
@CrossOrigin(origins = "*")
public class AdminTrainerController {

    private final TrainerService trainerService;
    private final AuthService authService;

    public AdminTrainerController(TrainerService trainerService, AuthService authService) {
        this.trainerService = trainerService;
        this.authService = authService;
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<AuthResponse> createTrainer(
            @Valid @RequestBody RegisterRequest request) {
        request.setRole(com.gym.GymAutomation.entity.Role.TRAINER);
        return ResponseEntity.status(201).body(authService.register(request));
    }


    // =========================
    // VIEW ALL TRAINERS
    // =========================

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Trainer>> getAllTrainers() {

        return ResponseEntity.ok(
                trainerService.getAllTrainers()
        );
    }


    // =========================
    // VIEW TRAINER BY ID
    // =========================

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Trainer> getTrainerById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                trainerService.getTrainerById(id)
        );
    }


    // =========================
    // UPDATE TRAINER
    // =========================

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Trainer> updateTrainer(
            @PathVariable Long id,
            @RequestBody Trainer trainer) {

        return ResponseEntity.ok(
                trainerService.updateTrainer(id, trainer)
        );
    }


    // =========================
    // DELETE TRAINER
    // =========================

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteTrainer(
            @PathVariable Long id) {

        trainerService.deleteTrainer(id);

        return ResponseEntity.ok(
                "Trainer deleted successfully"
        );
    }
}