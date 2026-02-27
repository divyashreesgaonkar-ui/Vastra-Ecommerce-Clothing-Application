package com.vasthra.controller;

import org.springframework.web.bind.annotation.*;

import com.vasthra.entity.User;
import com.vasthra.entity.WishList;

import com.vasthra.service.WishlistService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/wishlist")
@RequiredArgsConstructor
@CrossOrigin
public class WishlistController {

    private final WishlistService wishlistService;

    @PostMapping("/add")
    public WishList addToWishlist(
            @RequestBody User user,
            @RequestBody Integer productId) {

        return wishlistService.addToWishlist(user, productId);
    }

    @GetMapping
    public WishList getWishlist(@RequestParam User user) {
        return wishlistService.getWishlistByEmail(user);
    }

    @PostMapping("/move-to-cart/{wishlistItemId}")
    public void moveToCart(
            @PathVariable Long wishlistItemId,
            @RequestBody User user) {

        wishlistService.moveToCart(wishlistItemId, user);
    }
}
