package com.vasthra.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vasthra.entity.Cart;
import com.vasthra.entity.User;

public interface CartRepository extends JpaRepository<Cart, Long> {

    Optional<Cart> findByUser(User user);
}
