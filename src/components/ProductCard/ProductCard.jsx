import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';
import { formatPrice, truncateText } from '../../utils/helpers';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const wishlisted = isInWishlist(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-md overflow-hidden group"
    >
      <div className="relative overflow-hidden bg-gray-100 p-4">
        <Link to={`/products/${product.id}`}>
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-48 object-contain group-hover:scale-110 transition-transform duration-300"
          />
        </Link>
        <button
          onClick={() => toggleWishlist(product)}
          className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition-colors ${
            wishlisted
              ? 'bg-red-500 text-white'
              : 'bg-white text-gray-600 hover:bg-red-50'
          }`}
        >
          <FiHeart size={18} />
        </button>
        {product.category && (
          <span className="absolute top-3 left-3 bg-indigo-600 text-white text-xs px-2 py-1 rounded-full">
            {product.category}
          </span>
        )}
      </div>

      <div className="p-4">
        <Link to={`/products/${product.id}`}>
          <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 hover:text-indigo-600 transition-colors">
            {truncateText(product.title, 50)}
          </h3>
        </Link>

        <div className="flex items-center mt-2 space-x-1">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`text-sm ${
                  i < Math.round(product.rating?.rate || 0)
                    ? 'text-yellow-400'
                    : 'text-gray-300'
                }`}
              >
                &#9733;
              </span>
            ))}
          </div>
          <span className="text-xs text-gray-500">
            ({product.rating?.count || 0})
          </span>
        </div>

        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-bold text-indigo-600">
            {formatPrice(product.price)}
          </span>
          <button
            onClick={() => addToCart(product)}
            className="flex items-center space-x-1 bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-indigo-700 transition-colors"
          >
            <FiShoppingCart size={14} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductCard;