package com.vasthra.service;

import java.util.List;

import com.vasthra.dto.ProductDTO;

public interface ProductService {

    ProductDTO createProduct(ProductDTO productDTO);

    ProductDTO updateProduct(Integer id, ProductDTO productDTO);

    ProductDTO getProductById(Integer id);

    List<ProductDTO> getAllProducts();

    List<ProductDTO> getProductsByCategory(Integer categoryId);

    void deleteProduct(Integer id);
}
