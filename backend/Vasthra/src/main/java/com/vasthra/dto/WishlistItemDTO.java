package com.vasthra.dto;

import com.vasthra.entity.Product;
import com.vasthra.entity.WishList;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WishlistItemDTO {

       
    private Long wishlistItemId;
    private WishList wishlist;
    private Product product;
}
