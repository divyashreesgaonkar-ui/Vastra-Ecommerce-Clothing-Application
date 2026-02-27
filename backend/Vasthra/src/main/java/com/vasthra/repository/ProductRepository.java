package com.vasthra.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.vasthra.entity.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {

    // To fetch products by category
    List<Product> findByCategory_Id(Integer categoryId);
}
