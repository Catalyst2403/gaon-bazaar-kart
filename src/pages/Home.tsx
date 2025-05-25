
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

  // Map display names to actual category values in products data
  const categoryMap: { [key: string]: string } = {
    'All': 'All',
    'Fruits & Vegetables': 'fruits-vegetables',
    'Dairy, Bread & Eggs': 'dairy-bread-eggs',
    'Munchies & Namkeen': 'munchies-namkeen',
    'Cold Drinks & Juices': 'cold-drinks-juices',
    'Atta, Rice, Oil & Dal': 'atta-rice-oil-dal'
  };

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category === categoryMap[selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-8 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-6xl font-bold mb-2 md:mb-4">FreshMart</h1>
          <p className="text-lg md:text-2xl mb-3 md:mb-6">Order now to get groceries delivered at your home in 30 minutes!</p>
          <p className="text-base md:text-xl mb-4 md:mb-8">Now available in dashrath</p>
          <div className="flex items-center justify-center space-x-2 text-sm md:text-lg">
            <ShoppingCart size={20} className="md:w-6 md:h-6" />
            <span>Fresh • Fast • Reliable</span>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="container mx-auto px-4 py-4 md:py-8">
        <div className="flex flex-wrap gap-2 mb-4 md:mb-8 justify-center">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-2 text-xs md:text-sm rounded-lg font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-orange-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-orange-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid - Mobile Optimized */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
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
      <footer className="bg-gray-800 text-white py-6 md:py-8 mt-8 md:mt-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">FreshMart</h3>
          <p className="text-gray-300 mb-2 md:mb-4 text-sm md:text-base">Fresh groceries delivered to your doorstep</p>
          <div className="space-y-1 md:space-y-2 text-xs md:text-sm">
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
