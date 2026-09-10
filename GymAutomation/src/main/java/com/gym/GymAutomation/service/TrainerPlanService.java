package com.gym.GymAutomation.service;

import com.gym.GymAutomation.dto.PlanRequest;
import com.gym.GymAutomation.entity.*;
import com.gym.GymAutomation.repository.*;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TrainerPlanService {
    private final UserRepository userRepository;
    private final TrainerRepository trainerRepository;
    private final MemberRepository memberRepository;
    private final WorkoutPlanRepository workoutPlans;
    private final DietPlanRepository dietPlans;

    public TrainerPlanService(UserRepository userRepository, TrainerRepository trainerRepository,
                              MemberRepository memberRepository, WorkoutPlanRepository workoutPlans,
                              DietPlanRepository dietPlans) {
        this.userRepository = userRepository;
        this.trainerRepository = trainerRepository;
        this.memberRepository = memberRepository;
        this.workoutPlans = workoutPlans;
        this.dietPlans = dietPlans;
    }

    public Trainer trainerFor(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Trainer user not found"));
        return trainerRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Trainer profile not found"));
    }

    public List<Member> membersFor(String email) {
        return memberRepository.findAllByTrainerId(trainerFor(email).getId());
    }

    public List<WorkoutPlan> workoutsFor(String email) {
        return workoutPlans.findAllByTrainerId(trainerFor(email).getId());
    }

    public List<DietPlan> dietsFor(String email) {
        return dietPlans.findAllByTrainerId(trainerFor(email).getId());
    }

    public WorkoutPlan createWorkout(String email, PlanRequest request) {
        Trainer trainer = trainerFor(email);
        WorkoutPlan plan = new WorkoutPlan();
        plan.setTrainer(trainer);
        plan.setMember(assignedMember(request.memberId(), trainer));
        plan.setTitle(request.title());
        plan.setDetails(request.details());
        return workoutPlans.save(plan);
    }

    public WorkoutPlan updateWorkout(String email, Long id, PlanRequest request) {
        WorkoutPlan plan = workoutPlans.findByIdAndTrainerId(id, trainerFor(email).getId())
                .orElseThrow(() -> new RuntimeException("Workout plan not found"));
        plan.setMember(assignedMember(request.memberId(), plan.getTrainer()));
        plan.setTitle(request.title());
        plan.setDetails(request.details());
        return workoutPlans.save(plan);
    }

    public void deleteWorkout(String email, Long id) {
        workoutPlans.delete(workoutPlans.findByIdAndTrainerId(id, trainerFor(email).getId())
                .orElseThrow(() -> new RuntimeException("Workout plan not found")));
    }

    public DietPlan createDiet(String email, PlanRequest request) {
        Trainer trainer = trainerFor(email);
        DietPlan plan = new DietPlan();
        plan.setTrainer(trainer);
        plan.setMember(assignedMember(request.memberId(), trainer));
        plan.setTitle(request.title());
        plan.setDetails(request.details());
        return dietPlans.save(plan);
    }

    public DietPlan updateDiet(String email, Long id, PlanRequest request) {
        DietPlan plan = dietPlans.findByIdAndTrainerId(id, trainerFor(email).getId())
                .orElseThrow(() -> new RuntimeException("Diet plan not found"));
        plan.setMember(assignedMember(request.memberId(), plan.getTrainer()));
        plan.setTitle(request.title());
        plan.setDetails(request.details());
        return dietPlans.save(plan);
    }

    public void deleteDiet(String email, Long id) {
        dietPlans.delete(dietPlans.findByIdAndTrainerId(id, trainerFor(email).getId())
                .orElseThrow(() -> new RuntimeException("Diet plan not found")));
    }

    private Member assignedMember(Long memberId, Trainer trainer) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("Member not found"));
        if (member.getTrainer() == null || !member.getTrainer().getId().equals(trainer.getId())) {
            throw new AccessDeniedException("Member is not assigned to this trainer");
        }
        return member;
    }
}