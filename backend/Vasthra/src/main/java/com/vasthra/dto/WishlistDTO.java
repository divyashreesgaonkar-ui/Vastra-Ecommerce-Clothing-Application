package com.vasthra.dto;

import java.util.List;

import com.vasthra.entity.User;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WishlistDTO {

    private Long wishlistId;
    private User user;
    private List<WishlistItemDTO> items;
}
