package com.vasthra.entity;

import java.util.List;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "wishlist")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WishList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long wishlistId;

    // Later map to User entity
//    private String customerEmail;
    
    @OneToOne
    @JoinColumn(name = "user_id", unique = true)
    private User user;

    @OneToMany(
        mappedBy = "wishlist",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    private List<WishlistItem> items;
}
