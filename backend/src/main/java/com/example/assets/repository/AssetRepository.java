package com.example.assets.repository;

import com.example.assets.entity.Asset;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AssetRepository extends JpaRepository<Asset, Long> {
    Optional<Asset> findByTagNumber(String tagNumber);
    boolean existsByTagNumber(String tagNumber);
}
