// src/services/productService.js
import axios from "axios";

const API_URL = "http://localhost:8081/api/products";

export const getAllProducts = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const getProductById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

export const getProductsByCategory = async (categoryId) => {
  const res = await axios.get(`${API_URL}/category/${categoryId}`);
  return res.data;
};

export const createProduct = async (product) => {
  const res = await axios.post(API_URL, product);
  return res.data;
};

export const updateProduct = async (id, product) => {
  const res = await axios.put(`${API_URL}/${id}`, product);
  return res.data;
};

export const deleteProduct = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
