package com.example.assets.dto;

import com.example.assets.entity.AssetStatus;
import lombok.Builder;
import lombok.Value;

import java.math.BigDecimal;
import java.time.LocalDate;

@Value
@Builder
public class AssetResponse {
    Long id;
    String name;
    String tagNumber;
    String category;
    String location;
    AssetStatus status;
    LocalDate purchaseDate;
    BigDecimal purchaseCost;
    String notes;
}
