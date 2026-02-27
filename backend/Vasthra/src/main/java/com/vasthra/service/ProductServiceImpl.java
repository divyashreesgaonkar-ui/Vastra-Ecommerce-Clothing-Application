package com.vasthra.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.vasthra.dto.ProductDTO;
import com.vasthra.entity.Category;
import com.vasthra.entity.Product;
import com.vasthra.repository.ProductRepository;

@Service
@Transactional
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryService categoryService;

    public ProductServiceImpl(ProductRepository productRepository,
                              CategoryService categoryService) {
        this.productRepository = productRepository;
        this.categoryService = categoryService;
    }

    // 🔹 Create Product
    @Override
    public ProductDTO createProduct(ProductDTO dto) {
    	
    	if (dto.getCategoryId() == null) {
    	    throw new IllegalArgumentException("Category ID cannot be null");
    	}

        Category category = categoryService.getCategory(dto.getCategoryId());

        Product product = Product.builder()
                .name(dto.getName())
                .price(dto.getPrice())
                .stockQuantity(dto.getStockQuantity())
                .description(dto.getDescription())
                .url(dto.getUrl())
                .category(category)
                .build();

        return mapToDTO(productRepository.save(product));
    }

    // 🔹 Update Product
    @Override
    public ProductDTO updateProduct(Integer id, ProductDTO dto) {
    	
    	if (dto.getCategoryId() == null) {
    	    throw new IllegalArgumentException("Category ID cannot be null");
    	}

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found: " + id));

        Category category = categoryService.getCategory(dto.getCategoryId());

        product.setName(dto.getName());
        product.setPrice(dto.getPrice());
        product.setStockQuantity(dto.getStockQuantity());
        product.setDescription(dto.getDescription());
        product.setUrl(dto.getUrl());
        product.setCategory(category);

        return mapToDTO(productRepository.save(product));
    }

    // 🔹 Get Product by ID
    @Override
    public ProductDTO getProductById(Integer id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found: " + id));
        return mapToDTO(product);
    }

    // 🔹 Get All Products
    @Override
    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    // 🔹 Get Products by Category
    @Override
    public List<ProductDTO> getProductsByCategory(Integer categoryId) {
        return productRepository.findByCategory_Id(categoryId)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    // 🔹 Delete Product
    @Override
    public void deleteProduct(Integer id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found: " + id));
        productRepository.delete(product);
    }

    // 🔁 ENTITY → DTO mapper
    private ProductDTO mapToDTO(Product product) {
        return ProductDTO.builder()
                .id(product.getId())
                .name(product.getName())
                .price(product.getPrice())
                .stockQuantity(product.getStockQuantity())
                .description(product.getDescription())
                .url(product.getUrl())
                .categoryId(product.getCategory().getId())
                .build();
    }
}
