
import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useCart } from '../hooks/useCart';
import { products } from '../data/products';

const Home = () => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Fruits & Vegetables',
    'Dairy, Bread & Eggs',
    'Munchies & Namkeen',
    'Cold Drinks & Juices',
    'Atta, Rice, Oil & Dal'
  ];

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">FreshMart</h1>
          <p className="text-xl md:text-2xl mb-6">Order now to get groceries delivered at your home in 30 minutes!</p>
          <p className="text-lg md:text-xl mb-8">Now available in dashrath</p>
          <div className="flex items-center justify-center space-x-2 text-lg">
            <ShoppingCart size={24} />
            <span>Fresh • Fast • Reliable</span>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-orange-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-orange-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">FreshMart</h3>
          <p className="text-gray-300 mb-4">Fresh groceries delivered to your doorstep</p>
          <div className="space-y-2 text-sm">
            <p>📞 +91 85111 73773</p>
            <p>📧 catalystvibe2403@gmail.com</p>
            <p>📍 Now available in dashrath</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
