package com.gym.GymAutomation.controller;

import com.gym.GymAutomation.entity.Trainer;
import com.gym.GymAutomation.service.TrainerService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/trainers")
@CrossOrigin(origins = "*")
public class AdminTrainerController {

    private final TrainerService trainerService;

    public AdminTrainerController(TrainerService trainerService) {
        this.trainerService = trainerService;
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