import { motion } from 'framer-motion';
import { getCategoryLabel } from '../../utils/helpers';

function CategoryTabs({ categories, activeCategory, onCategoryChange }) {
  const allCategories = ['all', ...categories];

  return (
    <div className="flex flex-wrap gap-2">
      {allCategories.map((cat) => (
        <motion.button
          key={cat}
          whileTap={{ scale: 0.95 }}
          onClick={() => onCategoryChange(cat)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeCategory === cat
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-white text-gray-600 border border-gray-300 hover:border-indigo-300 hover:text-indigo-600'
          }`}
        >
          {cat === 'all' ? 'All Products' : getCategoryLabel(cat)}
        </motion.button>
      ))}
    </div>
  );
}

export default CategoryTabs;