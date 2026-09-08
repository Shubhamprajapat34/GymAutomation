package com.gym.GymAutomation.controller;

import com.gym.GymAutomation.dto.PlanRequest;
import com.gym.GymAutomation.entity.*;
import com.gym.GymAutomation.service.TrainerPlanService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/trainer")
@PreAuthorize("hasRole('TRAINER')")
public class TrainerController {
    private final TrainerPlanService service;

    public TrainerController(TrainerPlanService service){
         this.service = service;
         }

    @GetMapping("/members")
    public List<Member> members(Authentication auth) {
         return service.membersFor(auth.getName());
         }

    @GetMapping("/workout-plans")
    public List<WorkoutPlan> workouts(Authentication auth) {
         return service.workoutsFor(auth.getName());
         }

    @PostMapping("/workout-plans")
    public WorkoutPlan createWorkout(Authentication auth, @Valid @RequestBody PlanRequest request) {
        return service.createWorkout(auth.getName(), request);
    }

    @PutMapping("/workout-plans/{id}")
    public WorkoutPlan updateWorkout(Authentication auth, @PathVariable Long id, @Valid @RequestBody PlanRequest request) {
        return service.updateWorkout(auth.getName(), id, request);
    }

    @DeleteMapping("/workout-plans/{id}")
    public ResponseEntity<Void> deleteWorkout(Authentication auth, @PathVariable Long id) {
        service.deleteWorkout(auth.getName(), id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/diet-plans")
    public List<DietPlan> diets(Authentication auth) {
         return service.dietsFor(auth.getName());
         }

    @PostMapping("/diet-plans")
    public DietPlan createDiet(Authentication auth, @Valid @RequestBody PlanRequest request) {
        return service.createDiet(auth.getName(), request);
    }

    @PutMapping("/diet-plans/{id}")
    public DietPlan updateDiet(Authentication auth, @PathVariable Long id, @Valid @RequestBody PlanRequest request) {
        return service.updateDiet(auth.getName(), id, request);
    }

    @DeleteMapping("/diet-plans/{id}")
    public ResponseEntity<Void> deleteDiet(Authentication auth, @PathVariable Long id) {
        service.deleteDiet(auth.getName(), id);
        return ResponseEntity.noContent().build();
    }
}