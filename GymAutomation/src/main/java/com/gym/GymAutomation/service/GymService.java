package com.gym.GymAutomation.service;

import org.springframework.stereotype.Service;

import com.gym.GymAutomation.entity.Gym;
import com.gym.GymAutomation.repository.GymRepository;

@Service
public class GymService {

    private final GymRepository gymRepository;

    public GymService(GymRepository gymRepository) {
        this.gymRepository = gymRepository;
    }


    // CREATE GYM
    public Gym createGym(Gym gym) {

        return gymRepository.save(gym);
    }


    // GET GYM
    public Gym getGym() {

       return gymRepository.findAll()
            .stream()
            .findFirst()
            .orElseThrow(() ->
                    new RuntimeException("Gym information not found")
            );
    }


    // UPDATE GYM
    public Gym updateGym(Long id, Gym gym) {

        Gym existingGym = gymRepository.findById(id)
                                       .orElseThrow(() ->new RuntimeException("Gym not found"));

        existingGym.setGymName(gym.getGymName());
        existingGym.setAddress(gym.getAddress());
        existingGym.setPhone(gym.getPhone());
        existingGym.setEmail(gym.getEmail());
        existingGym.setOpeningTime(gym.getOpeningTime());
        existingGym.setClosingTime(gym.getClosingTime());
        existingGym.setDescription(gym.getDescription());

        return gymRepository.save(existingGym);
    }
}