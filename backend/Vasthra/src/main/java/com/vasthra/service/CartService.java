package com.vasthra.service;

import com.vasthra.dto.CartDTO;
import com.vasthra.entity.User;

public interface CartService {

    CartDTO getCartByUser(User user);

    CartDTO addToCart(User user, Integer productId, Integer quantity);

    CartDTO updateQuantity(Long cartItemId, Integer quantity);

    void removeItem(Long cartItemId);

    void clearCart(User user);
}
