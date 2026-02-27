package com.vasthra.service;

import java.util.ArrayList;

import org.springframework.stereotype.Service;

import com.vasthra.dto.*;
import com.vasthra.entity.*;
import com.vasthra.repository.*;


import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;

    @Override
    public CartDTO getCartByUser(User user) {
        Cart cart = cartRepository.findByUser(user)
                .orElseGet(() -> createNewCart(user));
        return mapToDTO(cart);
    }

    @Override
    public CartDTO addToCart(User user, Integer productId, Integer quantity) {
//        Cart cart = cartRepository.findByCustomerEmail(email)
//                .orElseGet(() -> createNewCart(email));
        
        Cart cart = cartRepository.findByUser(user)
                .orElseGet(() -> createNewCart(user));

        CartItem item = CartItem.builder()
                .cart(cart)
                .productId(productId)
                .productName("TEMP_NAME") // replace later
                .price(0.0)               // replace later
                .quantity(quantity)
                .subTotal(0.0)
                .build();

        cart.getItems().add(item);
        recalculateCart(cart);

        return mapToDTO(cartRepository.save(cart));
    }

    @Override
    public CartDTO updateQuantity(Long cartItemId, Integer quantity) {
        CartItem item = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("Item not found"));

        item.setQuantity(quantity);
        item.setSubTotal(item.getPrice() * quantity);

        Cart cart = item.getCart();
        recalculateCart(cart);

        cartRepository.save(cart);
        return mapToDTO(cart);
    }

    @Override
    public void removeItem(Long cartItemId) {
        cartItemRepository.deleteById(cartItemId);
    }

    @Override
    public void clearCart(User user) {
        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        cart.getItems().clear();
        cart.setTotalAmount(0.0);
        cartRepository.save(cart);
    }

    // ----------------- Helpers -----------------

    private Cart createNewCart(User user) {
        Cart cart = Cart.builder()
                .user(user)
                .items(new ArrayList<>())
                .totalAmount(0.0)
                .build();
        return cartRepository.save(cart);
    }

    private void recalculateCart(Cart cart) {
        double total = cart.getItems().stream()
                .mapToDouble(i -> i.getPrice() * i.getQuantity())
                .sum();
        cart.setTotalAmount(total);
    }

    private CartDTO mapToDTO(Cart cart) {
        return CartDTO.builder()
                .cartId(cart.getCartId())
                .user(cart.getUser())
                .totalAmount(cart.getTotalAmount())
                .items(
                        cart.getItems().stream().map(item ->
                                CartItemDTO.builder()
                                        .cartItemId(item.getCartItemId())
                                        .productId(item.getProductId())
                                        .productName(item.getProductName())
                                        .price(item.getPrice())
                                        .quantity(item.getQuantity())
                                        .subTotal(item.getSubTotal())
                                        .build()
                        ).toList()
                )
                .build();
    }
}
