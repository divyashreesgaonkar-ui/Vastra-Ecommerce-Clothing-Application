package com.vasthra.dto;

import java.util.List;

import com.vasthra.entity.User;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartDTO {

    private Long cartId;
//    private String customerEmail;
    private List<CartItemDTO> items;
    private Double totalAmount;
    private User user;
}

