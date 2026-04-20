import { useCartContext } from '../context/CartContext';

export function useWishlist() {
  const { wishlistItems, toggleWishlist, isInWishlist } = useCartContext();

  return {
    wishlistItems,
    toggleWishlist,
    isInWishlist,
  };
}