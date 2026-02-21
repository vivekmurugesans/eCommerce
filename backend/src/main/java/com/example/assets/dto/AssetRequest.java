package com.example.assets.dto;

import com.example.assets.entity.AssetStatus;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class AssetRequest {

    @NotBlank
    private String name;

    @NotBlank
    private String tagNumber;

    @NotBlank
    private String category;

    @NotBlank
    private String location;

    @NotNull
    private AssetStatus status;

    @NotNull
    private LocalDate purchaseDate;

    @NotNull
    @DecimalMin("0.0")
    private BigDecimal purchaseCost;

    private String notes;
}
