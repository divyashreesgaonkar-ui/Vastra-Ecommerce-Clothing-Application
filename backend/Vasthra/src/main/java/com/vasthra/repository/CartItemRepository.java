package com.vasthra.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vasthra.entity.CartItem;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
}
