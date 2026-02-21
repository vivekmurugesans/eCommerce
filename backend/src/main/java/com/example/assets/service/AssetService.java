package com.example.assets.service;

import com.example.assets.dto.AssetRequest;
import com.example.assets.dto.AssetResponse;
import com.example.assets.entity.Asset;
import com.example.assets.repository.AssetRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AssetService {

    private final AssetRepository assetRepository;

    public List<AssetResponse> getAllAssets() {
        return assetRepository.findAll().stream().map(this::toResponse).toList();
    }

    public AssetResponse getById(Long id) {
        Asset asset = assetRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Asset not found with id " + id));
        return toResponse(asset);
    }

    public AssetResponse create(AssetRequest request) {
        if (assetRepository.existsByTagNumber(request.getTagNumber())) {
            throw new IllegalArgumentException("Tag number already exists: " + request.getTagNumber());
        }

        Asset saved = assetRepository.save(Asset.builder()
                .name(request.getName())
                .tagNumber(request.getTagNumber())
                .category(request.getCategory())
                .location(request.getLocation())
                .status(request.getStatus())
                .purchaseDate(request.getPurchaseDate())
                .purchaseCost(request.getPurchaseCost())
                .notes(request.getNotes())
                .build());

        return toResponse(saved);
    }

    public AssetResponse update(Long id, AssetRequest request) {
        Asset existing = assetRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Asset not found with id " + id));

        if (!existing.getTagNumber().equals(request.getTagNumber())
                && assetRepository.existsByTagNumber(request.getTagNumber())) {
            throw new IllegalArgumentException("Tag number already exists: " + request.getTagNumber());
        }

        existing.setName(request.getName());
        existing.setTagNumber(request.getTagNumber());
        existing.setCategory(request.getCategory());
        existing.setLocation(request.getLocation());
        existing.setStatus(request.getStatus());
        existing.setPurchaseDate(request.getPurchaseDate());
        existing.setPurchaseCost(request.getPurchaseCost());
        existing.setNotes(request.getNotes());

        return toResponse(assetRepository.save(existing));
    }

    public void delete(Long id) {
        if (!assetRepository.existsById(id)) {
            throw new EntityNotFoundException("Asset not found with id " + id);
        }
        assetRepository.deleteById(id);
    }

    private AssetResponse toResponse(Asset asset) {
        return AssetResponse.builder()
                .id(asset.getId())
                .name(asset.getName())
                .tagNumber(asset.getTagNumber())
                .category(asset.getCategory())
                .location(asset.getLocation())
                .status(asset.getStatus())
                .purchaseDate(asset.getPurchaseDate())
                .purchaseCost(asset.getPurchaseCost())
                .notes(asset.getNotes())
                .build();
    }
}
