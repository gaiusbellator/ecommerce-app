import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiArrowLeft, FiStar } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useProduct } from '../../hooks/useProducts';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';
import { formatPrice, getCategoryLabel } from '../../utils/helpers';

function ProductDetails() {
  const { id } = useParams();
  const { product, loading, error } = useProduct(id);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-red-500 text-lg">Error loading product: {error}</p>
        <Link to="/products" className="text-indigo-600 mt-4 inline-block">
          Back to Products
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-500 text-lg">Product not found.</p>
        <Link to="/products" className="text-indigo-600 mt-4 inline-block">
          Back to Products
        </Link>
      </div>
    );
  }

  const wishlisted = isInWishlist(product.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/products"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors mb-6"
      >
        <FiArrowLeft /> Back to Products
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid md:grid-cols-2 gap-10"
      >
        <div className="bg-white rounded-xl shadow-md p-8 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-96 object-contain"
          />
        </div>

        <div className="space-y-5">
          <span className="inline-block bg-indigo-100 text-indigo-700 text-sm font-medium px-3 py-1 rounded-full">
            {getCategoryLabel(product.category)}
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            {product.title}
          </h1>

          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  className={
                    i < Math.round(product.rating?.rate || 0)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }
                  size={18}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">
              {product.rating?.rate} ({product.rating?.count} reviews)
            </span>
          </div>

          <p className="text-3xl font-bold text-indigo-600">
            {formatPrice(product.price)}
          </p>

          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          <div className="flex flex-wrap gap-3 pt-4">
            <button
              onClick={() => addToCart(product)}
              className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              <FiShoppingCart /> Add to Cart
            </button>
            <button
              onClick={() => toggleWishlist(product)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                wishlisted
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'border border-gray-300 text-gray-700 hover:border-red-300 hover:text-red-500'
              }`}
            >
              <FiHeart /> {wishlisted ? 'In Wishlist' : 'Add to Wishlist'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default ProductDetails;