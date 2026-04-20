import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { formatPrice } from '../../utils/helpers';
import { useCart } from '../../hooks/useCart';

function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-md"
    >
      <div className="w-20 h-20 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-contain p-1"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-gray-800 line-clamp-1">
          {item.title}
        </h3>
        <p className="text-indigo-600 font-bold mt-1">{formatPrice(item.price)}</p>

        <div className="flex items-center gap-3 mt-2">
          <button
            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
            disabled={item.quantity <= 1}
            className="p-1 rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <FiMinus size={14} />
          </button>
          <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
            className="p-1 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            <FiPlus size={14} />
          </button>
        </div>
      </div>

      <div className="text-right flex flex-col items-end gap-2">
        <p className="font-bold text-gray-800">
          {formatPrice(item.price * item.quantity)}
        </p>
        <button
          onClick={() => removeFromCart(item.productId)}
          className="text-red-500 hover:text-red-700 transition-colors"
        >
          <FiTrash2 size={18} />
        </button>
      </div>
    </motion.div>
  );
}

export default CartItem;