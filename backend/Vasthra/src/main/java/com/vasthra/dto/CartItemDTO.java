package com.vasthra.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartItemDTO {

    private Long cartItemId;
    private Integer productId;
    private String productName;
    private Double price;
    private Integer quantity;
    private Double subTotal;
}
