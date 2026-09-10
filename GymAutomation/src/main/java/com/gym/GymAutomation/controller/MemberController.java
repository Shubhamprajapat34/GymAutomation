package com.gym.GymAutomation.controller;

import com.gym.GymAutomation.entity.DietPlan;
import com.gym.GymAutomation.entity.Member;
import com.gym.GymAutomation.entity.Trainer;
import com.gym.GymAutomation.entity.WorkoutPlan;
import com.gym.GymAutomation.service.MemberService;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/member")
@PreAuthorize("hasRole('MEMBER')")
public class MemberController {

    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @GetMapping("/dashboard")
    public Map<String, Object> getDashboard(
            Authentication authentication) {

        return memberService.getMemberDashboard(
                authentication.getName()
        );
    }

    // MEMBER PROFILE
    @GetMapping("/profile")
    public Member getProfile(
            Authentication authentication) {

        return memberService.getMemberProfile(
                authentication.getName()
        );
    }

    @GetMapping("/trainer")
    public Trainer getTrainer(
        Authentication authentication) {

    return memberService.getMemberTrainer(authentication.getName());
    }

    @GetMapping("/diet-plans")
    public List<DietPlan> getDietPlans(Authentication authentication) {

    return memberService.getMemberDietPlans(
                   authentication.getName());
    }

    @GetMapping("/workout-plans")
    public List<WorkoutPlan> getWorkoutPlans(
        Authentication authentication) {

    return memberService.getMemberWorkoutPlans(
            authentication.getName());
    }

    @GetMapping("/membership")
    public Member getMembership(Authentication authentication) {

    return memberService.getMemberMembership(authentication.getName());
    }
}