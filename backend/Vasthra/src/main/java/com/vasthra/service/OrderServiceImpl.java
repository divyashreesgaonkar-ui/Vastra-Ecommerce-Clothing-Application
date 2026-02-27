package com.vasthra.service;


import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.vasthra.dto.OrderDTO;
import com.vasthra.entity.Order;
import com.vasthra.repository.OrderRepository;


import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;

    private OrderDTO mapToDTO(Order order) {
        return OrderDTO.builder()
                .orderId(order.getOrderId())
                .customerName(order.getCustomerName())
                .orderDate(order.getOrderDate())
                .noOfItems(order.getNoOfItems())
                .totalAmount(order.getTotalAmount())
                .status(order.getStatus())
                .expectedDate(order.getExpectedDate())
                .build();
    }

    private Order mapToEntity(OrderDTO dto) {
        return Order.builder()
                .orderId(dto.getOrderId())
                .customerName(dto.getCustomerName())
                .orderDate(dto.getOrderDate())
                .noOfItems(dto.getNoOfItems())
                .totalAmount(dto.getTotalAmount())
                .status(dto.getStatus())
                .expectedDate(dto.getExpectedDate())
                .build();
    }

    @Override
    public OrderDTO createOrder(OrderDTO orderDTO) {
        Order order = mapToEntity(orderDTO);
        return mapToDTO(orderRepository.save(order));
    }

    @Override
    public List<OrderDTO> getAllOrders() {
        return orderRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public OrderDTO getOrderById(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        return mapToDTO(order);
    }

    @Override
    public OrderDTO updateOrder(Long orderId, OrderDTO orderDTO) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        order.setCustomerName(orderDTO.getCustomerName());
        order.setOrderDate(orderDTO.getOrderDate());
        order.setNoOfItems(orderDTO.getNoOfItems());
        order.setTotalAmount(orderDTO.getTotalAmount());
        order.setStatus(orderDTO.getStatus());
        order.setExpectedDate(orderDTO.getExpectedDate());

        return mapToDTO(orderRepository.save(order));
    }

    @Override
    public void deleteOrder(Long orderId) {
        orderRepository.deleteById(orderId);
    }
}

