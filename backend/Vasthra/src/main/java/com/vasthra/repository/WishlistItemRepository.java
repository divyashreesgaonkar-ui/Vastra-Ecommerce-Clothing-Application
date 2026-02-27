package com.vasthra.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vasthra.entity.WishlistItem;

public interface WishlistItemRepository extends JpaRepository<WishlistItem, Long> {
}
