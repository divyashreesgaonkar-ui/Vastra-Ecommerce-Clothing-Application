package com.vasthra.service;

import java.util.ArrayList;

import org.springframework.stereotype.Service;

import com.vasthra.entity.*;
import com.vasthra.repository.*;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class WishlistService {

    private final WishlistRepository wishlistRepository;
    private final WishlistItemRepository wishlistItemRepository;
    private final ProductRepository productRepository;
    private final CartService cartService;
    private final UserRepository userRepository;

    // Get or create wishlist
    private WishList getWishlist(User user) {
        return wishlistRepository.findByUser(user)
                .orElseGet(() -> wishlistRepository.save(
                        WishList.builder()
                                .user(user)
                                .items(new ArrayList<>())
                                .build()));
    }

    // Add product to wishlist
    public WishList addToWishlist(User user, Integer productId) {
        WishList wishlist = getWishlist(user);
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        boolean exists = wishlist.getItems().stream()
                .anyMatch(i -> i.getProduct().getId().equals(productId));

        if (!exists) {
            WishlistItem item = WishlistItem.builder()
                    .wishlist(wishlist)
                    .product(product)
                    .build();

            wishlist.getItems().add(item);
            wishlistRepository.save(wishlist);
        }

        return wishlist;
    }

    // Move wishlist item to cart
    public void moveToCart(Long wishlistItemId, User user) {
        WishlistItem item = wishlistItemRepository.findById(wishlistItemId)
                .orElseThrow(() -> new RuntimeException("Wishlist item not found"));

        cartService.addToCart(user, item.getProduct().getId(), 1);

        wishlistItemRepository.delete(item);
    }

    public WishList getWishlistByEmail(User user) {
        return getWishlist(user);
    }
}
