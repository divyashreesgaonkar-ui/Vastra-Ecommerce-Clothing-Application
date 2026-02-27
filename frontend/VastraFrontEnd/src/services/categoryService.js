import axios from "axios";

const API_BASE_URL = "http://localhost:8081/api/categories";

/* ---------------- GET ALL ---------------- */
export const getAllCategories = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

/* ---------------- GET BY ID ---------------- */
export const getCategoryById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/${id}`);
  return response.data;
};

/* ---------------- CREATE ---------------- */
export const createCategory = async (payload) => {
  const response = await axios.post(API_BASE_URL, payload);
  return response.data;
};

/* ---------------- UPDATE ---------------- */
export const updateCategory = async (id, payload) => {
  const response = await axios.put(`${API_BASE_URL}/${id}`, payload);
  return response.data;
};

/* ---------------- DELETE ---------------- */
export const deleteCategory = async (id) => {
  await axios.delete(`${API_BASE_URL}/${id}`);
};
