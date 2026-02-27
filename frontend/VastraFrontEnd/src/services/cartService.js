import axios from "axios";

const API_URL = "http://localhost:8081/api/cart";

export const getCart = (userId) =>
  axios.get(`${API_URL}/${userId}`);

export const addToCart = (userId, productId, quantity = 1) =>
  axios.post(`${API_URL}/add`, null, {
    params: { userId, productId, quantity }
  });

export const updateCartItem = (cartItemId, quantity) =>
  axios.put(`${API_URL}/update/${cartItemId}`, null, {
    params: { quantity }
  });

export const removeCartItem = (cartItemId) =>
  axios.delete(`${API_URL}/remove/${cartItemId}`);
