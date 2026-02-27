package com.vasthra.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.vasthra.dto.CartDTO;
import com.vasthra.entity.User;
import com.vasthra.service.CartService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class CartController {

    private final CartService cartService;

    @GetMapping("/{email}")
    public ResponseEntity<CartDTO> getCart(@PathVariable User user) {
        return ResponseEntity.ok(cartService.getCartByUser(user));
    }

    @PostMapping("/add")
    public ResponseEntity<CartDTO> addToCart(
            @RequestBody User user,
            @RequestBody Integer productId,
            @RequestBody Integer quantity) {
        return ResponseEntity.ok(cartService.addToCart(user, productId, quantity));
    }

    @PutMapping("/update/{cartItemId}")
    public ResponseEntity<CartDTO> updateQuantity(
            @PathVariable Long cartItemId,
            @RequestBody Integer quantity) {
        return ResponseEntity.ok(cartService.updateQuantity(cartItemId, quantity));
    }

    @DeleteMapping("/remove/{cartItemId}")
    public ResponseEntity<Void> removeItem(@PathVariable Long cartItemId) {
        cartService.removeItem(cartItemId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/clear/{email}")
    public ResponseEntity<Void> clearCart(@PathVariable User user) {
        cartService.clearCart(user);
        return ResponseEntity.noContent().build();
    }
}
