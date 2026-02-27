package com.vasthra.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderDTO {

    private Long orderId;
    private String customerName;
    private LocalDate orderDate;
    private Integer noOfItems;
    private Double totalAmount;
    private String status;
    private LocalDate expectedDate;
}
