import { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlistItems, setWishlistItems] = useState(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const saveCartToStorage = useCallback((items) => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, []);

  const saveWishlistToStorage = useCallback((items) => {
    localStorage.setItem('wishlist', JSON.stringify(items));
  }, []);

  const addToCart = useCallback((product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.productId === product.id);
      if (existing) {
        const updated = prev.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        saveCartToStorage(updated);
        toast.info(`${product.title} quantity updated in cart`);
        return updated;
      }
      const newItem = {
        productId: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      };
      const updated = [...prev, newItem];
      saveCartToStorage(updated);
      toast.success(`${product.title} added to cart`);
      return updated;
    });
  }, [saveCartToStorage]);

  const removeFromCart = useCallback((productId) => {
    setCartItems((prev) => {
      const item = prev.find((i) => i.productId === productId);
      const updated = prev.filter((item) => item.productId !== productId);
      saveCartToStorage(updated);
      if (item) toast.error(`${item.title} removed from cart`);
      return updated;
    });
  }, [saveCartToStorage]);

  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity < 1) return;
    setCartItems((prev) => {
      const updated = prev.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      );
      saveCartToStorage(updated);
      return updated;
    });
  }, [saveCartToStorage]);

  const clearCart = useCallback(() => {
    setCartItems([]);
    saveCartToStorage([]);
    toast.success('Cart cleared');
  }, [saveCartToStorage]);

  const toggleWishlist = useCallback((product) => {
    setWishlistItems((prev) => {
      const exists = prev.find((item) => item.productId === product.id);
      if (exists) {
        const updated = prev.filter((item) => item.productId !== product.id);
        saveWishlistToStorage(updated);
        toast.error(`${product.title} removed from wishlist`);
        return updated;
      }
      const newItem = {
        productId: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        category: product.category,
        rating: product.rating,
      };
      const updated = [...prev, newItem];
      saveWishlistToStorage(updated);
        toast.success(`${product.title} added to wishlist`);
      return updated;
    });
  }, [saveWishlistToStorage]);

  const isInWishlist = useCallback(
    (productId) => {
      return wishlistItems.some((item) => item.productId === productId);
    },
    [wishlistItems]
  );

  const cartTotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [cartItems]);

  const cartCount = useMemo(() => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        wishlistItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
}

export default CartContext;