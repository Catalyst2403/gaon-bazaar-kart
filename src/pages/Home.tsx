
import { useState, useEffect } from 'react';
import ProductCard, { Product } from '../components/ProductCard';
import { useCart } from '../hooks/useCart';
import { initialProducts, categories } from '../data/products';

const Home = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { addToCart } = useCart();

  // Load products from localStorage
  useEffect(() => {
    const savedProducts = localStorage.getItem('freshmart-products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const getProductsByCategory = (categoryId: string) => {
    return products.filter(product => product.category === categoryId).slice(0, 6);
  };

  const handleAddToCart = (product: Product, quantity: number) => {
    addToCart(product, quantity);
    // You could add a toast notification here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Fresh Groceries
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Delivered to your doorstep in our village
          </p>
          <p className="text-lg opacity-80">
            🚚 Free delivery on orders above ₹500 | 📞 Call us: +91 98765 43210
          </p>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-3 rounded-full transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-orange-100'
              }`}
            >
              All Categories
            </button>
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full transition-colors flex items-center space-x-2 ${
                  selectedCategory === category.id
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-orange-100'
                }`}
              >
                <span>{category.icon}</span>
                <span className="hidden sm:inline">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products by Category */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {selectedCategory === 'all' ? (
            // Show all categories with their products
            categories.map(category => {
              const categoryProducts = getProductsByCategory(category.id);
              if (categoryProducts.length === 0) return null;
              
              return (
                <div key={category.id} className="mb-16">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center space-x-3">
                      <span className="text-4xl">{category.icon}</span>
                      <span>{category.name}</span>
                    </h2>
                    <p className="text-gray-600">{category.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                    {categoryProducts.map(product => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={handleAddToCart}
                      />
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            // Show filtered products for selected category
            <div>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  {categories.find(cat => cat.id === selectedCategory)?.name}
                </h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-orange-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Need Help?</h3>
          <p className="text-gray-600 mb-6">Our team is always ready to assist you</p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
            <div className="flex items-center space-x-2">
              <span>📞</span>
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>📧</span>
              <span>freshmart@village.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>🕒</span>
              <span>7 AM - 9 PM daily</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
