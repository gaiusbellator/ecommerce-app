import { Link } from 'react-router-dom';
import { FiGithub, FiTwitter, FiMail } from 'react-icons/fi';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-3">ShopVerse</h3>
            <p className="text-gray-400 text-sm">
              Your one-stop destination for the best products at amazing prices.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-3">Quick Links</h3>
            <div className="flex flex-col space-y-2">
              <Link to="/" className="text-gray-400 hover:text-white text-sm transition-colors">
                Home
              </Link>
              <Link to="/products" className="text-gray-400 hover:text-white text-sm transition-colors">
                Products
              </Link>
              <Link to="/wishlist" className="text-gray-400 hover:text-white text-sm transition-colors">
                Wishlist
              </Link>
              <Link to="/cart" className="text-gray-400 hover:text-white text-sm transition-colors">
                Cart
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-3">Contact</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FiGithub size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FiTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FiMail size={20} />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} ShopVerse. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;