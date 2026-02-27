package com.vasthra.dto;

import com.vasthra.entity.Category;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductDTO {

	private Integer id;
	private String name;
	private String description;
	private long price;
	private Integer stockQuantity;
	
	@NotNull(message = "Category ID is required")
	private Integer categoryId;
	
	private String url;
//    private String categoryName;

}
