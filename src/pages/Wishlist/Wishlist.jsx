import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiArrowLeft } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useWishlist } from '../../hooks/useWishlist';
import { useCart } from '../../hooks/useCart';
import { formatPrice, truncateText } from '../../utils/helpers';

function Wishlist() {
  const { wishlistItems, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlistItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <FiHeart className="mx-auto text-gray-300 mb-4" size={64} />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your wishlist is empty</h2>
        <p className="text-gray-500 mb-6">
          Start adding products you love to your wishlist.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
        >
          <FiArrowLeft /> Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Wishlist</h1>
      <p className="text-gray-500 mb-8">{wishlistItems.length} saved item{wishlistItems.length !== 1 ? 's' : ''}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistItems.map((item) => (
          <motion.div
            key={item.productId}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <div className="bg-gray-50 p-4 flex items-center justify-center h-48">
              <img
                src={item.image}
                alt={item.title}
                className="max-h-40 object-contain"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 text-sm line-clamp-2">
                {truncateText(item.title, 50)}
              </h3>
              <p className="text-indigo-600 font-bold mt-2">{formatPrice(item.price)}</p>
              <div className="flex gap-2 mt-4">
                <Link
                  to={`/products/${item.productId}`}
                  className="flex-1 text-center px-3 py-2 border border-indigo-600 text-indigo-600 rounded-lg text-sm font-medium hover:bg-indigo-50 transition-colors"
                >
                  View Details
                </Link>
                <button
                  onClick={() => toggleWishlist(item)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <FiHeart className="fill-red-500" size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;