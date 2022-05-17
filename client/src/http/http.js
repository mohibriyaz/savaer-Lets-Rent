const axios = require("axios");
const BASE_URL = "http://localhost:5000";

export const createOrder = async (order) => {
  return await axios.post(`${BASE_URL}/payment/create-order`, order);
};
export const saveOrder = async (order) => {
  return await axios.post(`${BASE_URL}/payment/save-order`, order);
};
