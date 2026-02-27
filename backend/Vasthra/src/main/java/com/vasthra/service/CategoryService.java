package com.vasthra.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vasthra.dto.CategoryDTO;
import com.vasthra.entity.Category;
import com.vasthra.exception.ResourceNotFoundEx;
import com.vasthra.repository.CategoryRepository;

import lombok.Builder;

@Service
public class CategoryService {

	@Autowired
	private CategoryRepository categoryRepository;

	public Category getCategory(int categoryId) {
		Optional<Category> category = categoryRepository.findById(categoryId);
		return category.orElse(null);
	}

	public Category createCategory(CategoryDTO categoryDto) {
		Category category = mapToEntity(categoryDto);
		return categoryRepository.save(category);
	}

	private Category mapToEntity(CategoryDTO categoryDto) {
		Category category = Category.builder().code(categoryDto.getCode()).name(categoryDto.getName())
				.description(categoryDto.getDescription()).imageUrl(categoryDto.getImageUrl()).build();

		return category;
	}

	public List<Category> getAllCategory() {
		return categoryRepository.findAll();
	}

	public Category updateCategory(CategoryDTO categoryDto, int categoryId) {
		Category category = categoryRepository.findById(categoryId)
				.orElseThrow(() -> new ResourceNotFoundEx("Category not found with Id " + categoryDto.getId()));

		if (null != categoryDto.getName()) {
			category.setName(categoryDto.getName());
		}
		if (null != categoryDto.getCode()) {
			category.setCode(categoryDto.getCode());
		}
		if (null != categoryDto.getDescription()) {
			category.setDescription(categoryDto.getDescription());
		}
		if (null != categoryDto.getImageUrl()) {
			category.setImageUrl(categoryDto.getImageUrl());
		}



		return categoryRepository.save(category);
	}

	public void deleteCategory(int categoryId) {
		categoryRepository.deleteById(categoryId);
	}

}
