package com.gym.GymAutomation.service;

import com.gym.GymAutomation.dto.AuthResponse;
import com.gym.GymAutomation.dto.LoginRequest;
import com.gym.GymAutomation.dto.RegisterRequest;
import com.gym.GymAutomation.entity.Member;
import com.gym.GymAutomation.entity.Role;
import com.gym.GymAutomation.entity.Trainer;
import com.gym.GymAutomation.entity.User;
import com.gym.GymAutomation.repository.MemberRepository;
import com.gym.GymAutomation.repository.TrainerRepository;
import com.gym.GymAutomation.repository.UserRepository;
import com.gym.GymAutomation.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final MemberRepository memberRepository;
    private final TrainerRepository trainerRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository,
                       MemberRepository memberRepository,
                       TrainerRepository trainerRepository,
                       PasswordEncoder passwordEncoder,
                       JwtService jwtService) {
        this.userRepository = userRepository;
        this.memberRepository = memberRepository;
        this.trainerRepository = trainerRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email is already registered!");
        }

        Role role = request.getRole() != null ? request.getRole() : Role.MEMBER;

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setPhone(request.getPhone());
        user.setRole(role);
        user.setCreatedAt(LocalDateTime.now());

        User savedUser = userRepository.save(user);

        if (role == Role.MEMBER) {
            Member member = new Member(savedUser);
            if (request.getAddress() != null) {
                member.setAddress(request.getAddress());
            }
            if (request.getEmergencyContact() != null) {
                member.setEmergencyContact(request.getEmergencyContact());
            }
            memberRepository.save(member);
        } else if (role == Role.TRAINER) {
            Trainer trainer = new Trainer(savedUser);
            if (request.getSpecialization() != null) {
                trainer.setSpecialization(request.getSpecialization());
            }
            if (request.getExperienceYears() != null) {
                trainer.setExperienceYears(request.getExperienceYears());
            }
            if (request.getBio() != null) {
                trainer.setBio(request.getBio());
            }
            trainerRepository.save(trainer);
        }

        String token = jwtService.generateToken(savedUser);

        return new AuthResponse(
                token,
                savedUser.getId(),
                savedUser.getName(),
                savedUser.getEmail(),
                savedUser.getRole(),
                "User registered successfully as " + savedUser.getRole()
        );
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password!"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid email or password!");
        }

        String token = jwtService.generateToken(user);

        return new AuthResponse(
                token,
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole(),
                "Login successful"
        );
    }
}
