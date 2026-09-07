package com.gym.GymAutomation.service;

import com.gym.GymAutomation.entity.Trainer;
import com.gym.GymAutomation.repository.TrainerRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrainerService {

    private final TrainerRepository trainerRepository;

    public TrainerService(TrainerRepository trainerRepository) {
        this.trainerRepository = trainerRepository;
    }


    // VIEW ALL TRAINERS
    public List<Trainer> getAllTrainers() {
        return trainerRepository.findAll();
    }


    // VIEW TRAINER BY ID
    public Trainer getTrainerById(Long id) {

        return trainerRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Trainer not found with id: " + id));
    }


    // UPDATE TRAINER
    public Trainer updateTrainer(Long id, Trainer trainerDetails) {

        Trainer trainer = trainerRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Trainer not found with id: " + id));

        trainer.setSpecialization(trainerDetails.getSpecialization());
        trainer.setExperienceYears(trainerDetails.getExperienceYears());
        if (trainerDetails.getBio() != null) {
            trainer.setBio(trainerDetails.getBio());
        }

        return trainerRepository.save(trainer);
    }


    // DELETE TRAINER
    public void deleteTrainer(Long id) {

        Trainer trainer = trainerRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Trainer not found with id: " + id));

        trainerRepository.delete(trainer);
    }
}