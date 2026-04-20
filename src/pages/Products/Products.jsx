import { useState, useMemo, useEffect } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { useDebounce } from '../../hooks/useDebounce';
import { fetchCategories } from '../../services/api';
import SearchBar from '../../components/SearchBar/SearchBar';
import CategoryTabs from '../../components/CategoryTabs/CategoryTabs';
import Filters from '../../components/Filters/Filters';
import ProductGrid from '../../components/ProductGrid/ProductGrid';
import { PRICE_RANGES } from '../../utils/helpers';

function Products() {
  const { products, loading, error, getProductsByCategory, refetchAll } = useProducts();
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState(0);
  const [selectedSort, setSelectedSort] = useState('default');

  const debouncedSearch = useDebounce(searchQuery, 300);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch {}
    };
    loadCategories();
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    const range = PRICE_RANGES[selectedPriceRange];
    if (range) {
      result = result.filter((p) => {
        if (selectedPriceRange === 0) return true;
        return p.price >= range.min && p.price < range.max;
      });
    }

    switch (selectedSort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
        break;
      case 'newest':
        result.sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }

    return result;
  }, [products, debouncedSearch, selectedPriceRange, selectedSort]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    if (category === 'all') {
      refetchAll();
    } else {
      getProductsByCategory(category);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Products</h1>
        <p className="text-gray-500 mt-1">Discover our amazing collection</p>
      </div>

      <div className="mb-6">
        <CategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />
      </div>

      <div className="mb-6">
        <SearchBar onSearch={setSearchQuery} />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <aside className="lg:w-64 flex-shrink-0">
          <Filters
            selectedPriceRange={selectedPriceRange}
            onPriceChange={setSelectedPriceRange}
            selectedSort={selectedSort}
            onSortChange={setSelectedSort}
          />
        </aside>
        <div className="flex-1">
          <p className="text-sm text-gray-500 mb-4">
            Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
          </p>
          <ProductGrid products={filteredProducts} loading={loading} error={error} />
        </div>
      </div>
    </div>
  );
}

export default Products;