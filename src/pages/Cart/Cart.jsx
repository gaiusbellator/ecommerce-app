import { Link } from 'react-router-dom';
import { FiArrowLeft, FiShoppingCart, FiTrash2 } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import CartItem from '../../components/CartItem/CartItem';
import { useCart } from '../../hooks/useCart';
import { formatPrice, calculateTax } from '../../utils/helpers';

function Cart() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const tax = calculateTax(cartTotal);
  const total = cartTotal + tax;

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <FiShoppingCart className="mx-auto text-gray-300 mb-4" size={64} />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Looks like you haven&apos;t added anything yet.</p>
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
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Shopping Cart</h1>
          <p className="text-gray-500 mt-1">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''}</p>
        </div>
        <button
          onClick={clearCart}
          className="flex items-center gap-2 text-red-500 hover:text-red-700 font-medium transition-colors"
        >
          <FiTrash2 /> Clear Cart
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence>
            {cartItems.map((item) => (
              <CartItem key={item.productId} item={item} />
            ))}
          </AnimatePresence>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (8%)</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <hr />
              <div className="flex justify-between text-lg font-bold text-gray-800">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
            <Link
              to="/checkout"
              className="block w-full bg-indigo-600 text-white text-center py-3 rounded-lg font-semibold mt-6 hover:bg-indigo-700 transition-colors"
            >
              Proceed to Checkout
            </Link>
            <Link
              to="/products"
              className="block w-full text-center text-indigo-600 mt-3 text-sm hover:text-indigo-800 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;