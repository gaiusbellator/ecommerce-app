import { PRICE_RANGES } from '../../utils/helpers';

function Filters({ selectedPriceRange, onPriceChange, selectedSort, onSortChange }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 space-y-5">
      <div>
        <h3 className="font-semibold text-gray-800 mb-3">Price Range</h3>
        <div className="space-y-2">
          {PRICE_RANGES.map((range, idx) => (
            <label
              key={idx}
              className={`flex items-center space-x-2 cursor-pointer p-2 rounded-lg transition-colors ${
                selectedPriceRange === idx
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'hover:bg-gray-50'
              }`}
            >
              <input
                type="radio"
                name="priceRange"
                checked={selectedPriceRange === idx}
                onChange={() => onPriceChange(idx)}
                className="text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm">{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="border-t pt-4">
        <h3 className="font-semibold text-gray-800 mb-3">Sort By</h3>
        <select
          value={selectedSort}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="default">Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
          <option value="newest">Newest</option>
        </select>
      </div>
    </div>
  );
}

export default Filters;