
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { X, Plus } from 'lucide-react';
import { useEffect } from 'react';

// Declare gtag function for TypeScript
declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: any) => void;
  }
}

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getSubtotal, getTotalPrice, deliveryFee } = useCart();

  // Track cart page visit
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: 'Cart Page',
        page_location: window.location.href
      });
    }
  }, []);

  const handleProceedToCheckout = () => {
    // Google Analytics tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'begin_checkout', {
        currency: 'INR',
        value: getTotalPrice(),
        items: cartItems.map(item => ({
          item_id: item.id,
          item_name: item.name,
          category: item.category,
          quantity: item.quantity,
          price: item.price
        }))
      });
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-8xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Add some fresh groceries to get started!</p>
          <Link
            to="/"
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Your Cart</h1>
          
          <div className="space-y-4 mb-8">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-orange-600 font-bold">
                    ₹{item.price}
                    {item.unit && <span className="text-sm text-gray-500">/{item.unit}</span>}
                  </p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1 hover:bg-gray-100 transition-colors"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 border-x">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 hover:bg-gray-100 transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  
                  <div className="text-lg font-bold text-gray-800 min-w-20 text-right">
                    ₹{item.price * item.quantity}
                  </div>
                  
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-200 pt-6">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between items-center text-lg">
                <span>Subtotal:</span>
                <span>₹{getSubtotal()}</span>
              </div>
              <div className="flex justify-between items-center text-lg">
                <span>Delivery Fee:</span>
                <span>₹{deliveryFee}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center text-2xl font-bold text-gray-800 mb-6 border-t border-gray-200 pt-4">
              <span>Total:</span>
              <span className="text-orange-600">₹{getTotalPrice()}</span>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/"
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-semibold text-center transition-colors"
              >
                Continue Shopping
              </Link>
              <Link
                to="/checkout"
                onClick={handleProceedToCheckout}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold text-center transition-colors"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
