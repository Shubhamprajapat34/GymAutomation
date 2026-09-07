package com.gym.GymAutomation.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.gym.GymAutomation.entity.Gym;
import com.gym.GymAutomation.service.GymService;

@RestController
@RequestMapping("/api/gym")
@CrossOrigin(origins = "http://localhost:5173")
public class GymController {

    private final GymService gymService;

    public GymController(GymService gymService) {
        this.gymService = gymService;
    }


    // ADMIN CAN CREATE GYM
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Gym createGym(@RequestBody Gym gym) {

        return gymService.createGym(gym);
    }


    // ADMIN, TRAINER AND MEMBER CAN VIEW GYM
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'TRAINER', 'MEMBER')")
    public Gym getGym() {

        return gymService.getGym();
    }


    // ONLY ADMIN CAN UPDATE GYM
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Gym updateGym(
            @PathVariable Long id,
            @RequestBody Gym gym) {

        return gymService.updateGym(id, gym);
    }
}