package com.vasthra.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.vasthra.entity.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {

}
