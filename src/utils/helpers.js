export const PRICE_RANGES = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under $100', min: 0, max: 100 },
  { label: '$100 - $500', min: 100, max: 500 },
  { label: '$500 - $1000', min: 500, max: 1000 },
  { label: '$1000+', min: 1000, max: Infinity },
];

export const SORT_OPTIONS = [
  { value: 'default', label: 'Default' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'newest', label: 'Newest' },
];

export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

export const calculateTax = (subtotal, rate = 0.08) => {
  return subtotal * rate;
};

export const truncateText = (text, maxLength = 80) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const getCategoryLabel = (category) => {
  const labels = {
    electronics: 'Electronics',
    jewelery: 'Jewelry',
    "men's clothing": "Men's Clothing",
    "women's clothing": "Women's Clothing",
  };
  return labels[category] || category;
};