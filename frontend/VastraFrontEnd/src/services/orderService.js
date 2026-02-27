import axios from "axios";

const API_URL = "http://localhost:8081/api/orders";

export const getAllOrders = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};
