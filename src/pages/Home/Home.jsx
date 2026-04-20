import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiArrowRight, FiStar } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { fetchAllProducts } from '../../services/api';
import ProductGrid from '../../components/ProductGrid/ProductGrid';

function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        const products = await fetchAllProducts();
        setFeatured(products.slice(0, 6));
      } catch {
      } finally {
        setLoading(false);
      }
    };
    loadFeatured();
  }, []);

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Discover Amazing Products
              </h1>
              <p className="mt-4 text-indigo-100 text-lg max-w-md">
                Explore thousands of products across electronics, clothing, jewelry, and more.
                Find the best deals curated just for you.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 bg-white text-indigo-700 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
                >
                  <FiShoppingCart />
                  Shop Now
                </Link>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
                >
                  View All Products
                  <FiArrowRight />
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden md:block text-center"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="text-6xl font-bold">$0</div>
                <div className="text-indigo-200 mt-2">Free Shipping on Orders $50+</div>
                <div className="flex justify-center gap-6 mt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold">10K+</div>
                    <div className="text-indigo-200 text-sm">Products</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">50K+</div>
                    <div className="text-indigo-200 text-sm">Customers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold flex items-center justify-center">
                      4.8 <FiStar className="text-yellow-400 ml-1" />
                    </div>
                    <div className="text-indigo-200 text-sm">Rating</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Featured Products
            </h2>
            <p className="text-gray-500 mt-1">Handpicked just for you</p>
          </div>
          <Link
            to="/products"
            className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1 transition-colors"
          >
            View All <FiArrowRight />
          </Link>
        </div>
        <ProductGrid products={featured} loading={loading} />
      </section>

      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-10">
            Why Shop With Us?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Free Shipping',
                desc: 'Free shipping on all orders over $50',
                icon: '🚚',
              },
              {
                title: 'Secure Payment',
                desc: '100% secure payment processing',
                icon: '🔒',
              },
              {
                title: 'Easy Returns',
                desc: '30-day money back guarantee',
                icon: '↩️',
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.15 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-md text-center"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-gray-800 text-lg">{item.title}</h3>
                <p className="text-gray-500 mt-2 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;