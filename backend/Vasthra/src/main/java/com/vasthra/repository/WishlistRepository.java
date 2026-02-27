package com.vasthra.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vasthra.entity.User;
import com.vasthra.entity.WishList;


public interface WishlistRepository extends JpaRepository<WishList, Long> {

    Optional<WishList> findByUser(User user);
}
