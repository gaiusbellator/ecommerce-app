import axios from 'axios';

const API_BASE = 'https://fakestoreapi.com';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

export const fetchAllProducts = async () => {
  const { data } = await api.get('/products');
  return data;
};

export const fetchProductById = async (id) => {
  const { data } = await api.get(`/products/${id}`);
  return data;
};

export const fetchCategories = async () => {
  const { data } = await api.get('/products/categories');
  return data;
};

export const fetchProductsByCategory = async (category) => {
  const { data } = await api.get(`/products/category/${category}`);
  return data;
};

export default api;