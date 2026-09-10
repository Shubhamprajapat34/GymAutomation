package com.gym.GymAutomation.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record PlanRequest(
        @NotNull Long memberId,
        @NotBlank String title,
        @NotBlank String details
) {}