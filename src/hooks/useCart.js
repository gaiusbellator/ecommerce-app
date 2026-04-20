import { useCallback } from 'react';
import { useCartContext } from '../context/CartContext';

export function useCart() {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount,
  } = useCartContext();

  const getItemQuantity = useCallback(
    (productId) => {
      const item = cartItems.find((item) => item.productId === productId);
      return item ? item.quantity : 0;
    },
    [cartItems]
  );

  const isItemInCart = useCallback(
    (productId) => {
      return cartItems.some((item) => item.productId === productId);
    },
    [cartItems]
  );

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount,
    getItemQuantity,
    isItemInCart,
  };
}