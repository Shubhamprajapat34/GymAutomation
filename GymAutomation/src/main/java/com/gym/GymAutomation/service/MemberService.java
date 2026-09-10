package com.gym.GymAutomation.service;

import com.gym.GymAutomation.entity.DietPlan;
import com.gym.GymAutomation.entity.Member;
import com.gym.GymAutomation.entity.Membership;
import com.gym.GymAutomation.entity.Trainer;
import com.gym.GymAutomation.entity.User;
import com.gym.GymAutomation.entity.WorkoutPlan;
import com.gym.GymAutomation.repository.DietPlanRepository;
import com.gym.GymAutomation.repository.MemberRepository;
import com.gym.GymAutomation.repository.MembershipRepository;
import com.gym.GymAutomation.repository.TrainerRepository;
import com.gym.GymAutomation.repository.UserRepository;
import com.gym.GymAutomation.repository.WorkoutPlanRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final UserRepository userRepository;
    private final MembershipRepository membershipRepository;
    private final TrainerRepository trainerRepository;
    private final DietPlanRepository dietPlanRepository;
    private final WorkoutPlanRepository workoutPlanRepository;


    public MemberService(
        MemberRepository memberRepository,
        UserRepository userRepository,
        MembershipRepository membershipRepository,
        TrainerRepository trainerRepository,
        DietPlanRepository dietPlanRepository,
        WorkoutPlanRepository workoutPlanRepository) {

    this.memberRepository = memberRepository;
    this.userRepository = userRepository;
    this.membershipRepository = membershipRepository;
    this.trainerRepository = trainerRepository;

    this.dietPlanRepository = dietPlanRepository;
    this.workoutPlanRepository = workoutPlanRepository;
}


    // ==========================
    // VIEW ALL MEMBERS
    // ==========================
    public List<Member> getAllMembers() {
        return memberRepository.findAll();
    }

    public List<Member> getMembersForTrainer(Long trainerId) {
        return memberRepository.findAllByTrainerId(trainerId);
    }

    // ==========================
    // VIEW MEMBER BY ID
    // ==========================
    public Member getMemberById(Long id) {
        return memberRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Member not found with id: " + id));
    }

    // ==========================
    // UPDATE MEMBER
    // ==========================
    @Transactional
    public Member updateMember(Long id, Member memberDetails) {
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Member not found with id: " + id));

        // Update Member specific fields
        if (memberDetails.getAddress() != null) {
            member.setAddress(memberDetails.getAddress());
        }

        if (memberDetails.getEmergencyContact() != null) {
            member.setEmergencyContact(memberDetails.getEmergencyContact());
        }

        if (memberDetails.getMembershipStatus() != null) {
            member.setMembershipStatus(memberDetails.getMembershipStatus());
        }

        // Update User specific fields if provided
        if (memberDetails.getUser() != null && member.getUser() != null) {
            User existingUser = member.getUser();

            if (memberDetails.getUser().getName() != null) {
                existingUser.setName(memberDetails.getUser().getName());
            }

            if (memberDetails.getUser().getEmail() != null) {
                existingUser.setEmail(memberDetails.getUser().getEmail());
            }

            if (memberDetails.getUser().getPhone() != null) {
                existingUser.setPhone(memberDetails.getUser().getPhone());
            }

            userRepository.save(existingUser);
        }

        return memberRepository.save(member);
    }
    //==============================================================
    // assign membership to member 
    
    @Transactional
    public Member assignMembership(Long memberId, Long membershipId) {

    Member member = memberRepository.findById(memberId)
            .orElseThrow(() ->
                    new RuntimeException("Member not found with ID: " + memberId)
            );

    Membership membership = membershipRepository.findById(membershipId)
            .orElseThrow(() ->
                    new RuntimeException("Membership not found with ID: " + membershipId)
            );

    // Membership assign
    member.setMembership(membership);

    // Subscription activate
    member.setSubscriptionStatus("ACTIVE");

    return memberRepository.save(member);
   }

    @Transactional
    public Member assignTrainer(Long memberId, Long trainerId) {
    Member member = memberRepository.findById(memberId)
        .orElseThrow(() -> new RuntimeException("Member not found with ID: " + memberId));

    member.setTrainer(trainerRepository.findById(trainerId)
        .orElseThrow(() -> new RuntimeException("Trainer not found with ID: " + trainerId)));

    return memberRepository.save(member);
    }
    

    // ==========================
    // DELETE MEMBER
    // ==========================
    @Transactional
    public void deleteMember(Long id) {
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Member not found with id: " + id));

        memberRepository.delete(member);
    }

    
    // MEMBER DASHBOARD


public Map<String, Object> getMemberDashboard(String email) {

    // Find logged-in member
    Member member = memberRepository.findByUserEmail(email)
            .orElseThrow(() ->
                    new RuntimeException("Member not found")
            );

    // Get diet plans
    List<DietPlan> dietPlans =
            dietPlanRepository.findAllByMemberId(member.getId());

    // Get workout plans
    List<WorkoutPlan> workoutPlans =
            workoutPlanRepository.findAllByMemberId(member.getId());

    // Dashboard response
    Map<String, Object> dashboard = new HashMap<>();

    dashboard.put("member", member);

    dashboard.put(
            "membership",
            member.getMembership()
    );

    dashboard.put(
            "trainer",
            member.getTrainer()
    );

    dashboard.put(
            "subscriptionStatus",
            member.getSubscriptionStatus()
    );

    dashboard.put(
            "membershipStatus",
            member.getMembershipStatus()
    );

    dashboard.put(
            "dietPlanCount",
            dietPlans.size()
    );

    dashboard.put(
            "workoutPlanCount",
            workoutPlans.size()
    );

    return dashboard;
}


public Member getMemberProfile(String email) {

    return memberRepository.findByUserEmail(email)
            .orElseThrow(() ->
                    new RuntimeException(
                            "Member not found with email: " + email
                    )
            );
}


// VIEW MY TRAINER
public Trainer getMemberTrainer(String email) {

    Member member = memberRepository.findByUserEmail(email)
            .orElseThrow(() ->
                    new RuntimeException(
                            "Member not found with email: " + email
                    )
            );

    if (member.getTrainer() == null) {
        throw new RuntimeException("No trainer assigned to this member");
    }

    return member.getTrainer();
}
// LIST OF DIET THAT I WILL FOLLOW
public List<DietPlan> getMemberDietPlans(String email) {

    Member member = memberRepository.findByUserEmail(email)
            .orElseThrow(() ->
                    new RuntimeException(
                            "Member not found with email: " + email
                    )
            );

    return dietPlanRepository.findAllByMemberId(member.getId());
}

// to find the list of workout that i will follow
public List<WorkoutPlan> getMemberWorkoutPlans(String email) {

    Member member = memberRepository.findByUserEmail(email)
            .orElseThrow(() ->
                    new RuntimeException(
                            "Member not found with email: " + email
                    )
            );

    return workoutPlanRepository.findAllByMemberId(member.getId());
}

// getting of membrship of membr
public Member getMemberMembership(String email) {

    Member member = memberRepository.findByUserEmail(email)
            .orElseThrow(() ->
                    new RuntimeException(
                            "Member not found with email: " + email
                    )
            );

    return member;
}

}