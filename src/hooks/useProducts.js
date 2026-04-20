import { useState, useEffect } from 'react';
import { fetchAllProducts, fetchProductsByCategory, fetchProductById } from '../services/api';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchAllProducts();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const getProductsByCategory = async (category) => {
    try {
      setLoading(true);
      const data = await fetchProductsByCategory(category);
      setProducts(data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const refetchAll = async () => {
    try {
      setLoading(true);
      const data = await fetchAllProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  return { products, loading, error, getProductsByCategory, refetchAll };
}

export function useProduct(id) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    const loadProduct = async () => {
      try {
        setLoading(true);
        const data = await fetchProductById(id);
        setProduct(data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch product');
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  return { product, loading, error };
}