
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { useCart } from "../hooks/useCart";
import { useToast } from "@/hooks/use-toast";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  unit?: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
}

// Declare gtag function for TypeScript
declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: any) => void;
  }
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const { cartItems, updateQuantity } = useCart();
  const { toast } = useToast();
  const cartItem = cartItems.find(item => item.id === product.id);
  const isInCart = !!cartItem;
  const currentQuantity = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    onAddToCart(product, 1);
    
    // Google Analytics tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'add_to_cart', {
        currency: 'INR',
        value: product.price,
        items: [{
          item_id: product.id,
          item_name: product.name,
          category: product.category,
          quantity: 1,
          price: product.price
        }]
      });
    }
    
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
      duration: 2000,
    });
  };

  const handleIncrement = () => {
    updateQuantity(product.id, currentQuantity + 1);
    
    // Google Analytics tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'add_to_cart', {
        currency: 'INR',
        value: product.price,
        items: [{
          item_id: product.id,
          item_name: product.name,
          category: product.category,
          quantity: 1,
          price: product.price
        }]
      });
    }
  };

  const handleDecrement = () => {
    if (currentQuantity > 1) {
      updateQuantity(product.id, currentQuantity - 1);
    } else {
      updateQuantity(product.id, 0); // This will remove the item
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-orange-200 overflow-hidden relative hover:shadow-md transition-shadow">
      {/* Product Image - Mobile Optimized */}
      <div className="aspect-square overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      
      {/* Product Info */}
      <div className="p-2 md:p-3 space-y-1 md:space-y-2">
        {/* Price */}
        <div className="text-sm md:text-lg font-bold text-gray-900">
          ₹{product.price}
          {product.unit && <span className="text-xs md:text-sm text-gray-500 font-normal">/{product.unit}</span>}
        </div>
        
        {/* Product Name */}
        <h3 className="text-xs md:text-sm text-gray-700 line-clamp-2 leading-tight min-h-[2rem] md:min-h-[2.5rem]">
          {product.name}
        </h3>
        
        {/* Add to Cart Button or Quantity Controls */}
        <div className="pt-1">
          {!isInCart ? (
            <button
              onClick={handleAddToCart}
              className="w-full bg-white border-2 border-orange-500 text-orange-500 font-semibold py-2 md:py-2.5 px-2 md:px-4 rounded-lg hover:bg-orange-50 transition-colors text-xs md:text-sm"
            >
              ADD
            </button>
          ) : (
            <div className="flex items-center justify-between bg-orange-500 text-white rounded-lg p-1">
              <button
                onClick={handleDecrement}
                className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center hover:bg-orange-600 rounded-md transition-colors"
              >
                <Minus size={12} className="md:w-4 md:h-4" />
              </button>
              <span className="font-semibold text-xs md:text-sm px-1 md:px-2 min-w-[20px] text-center">{currentQuantity}</span>
              <button
                onClick={handleIncrement}
                className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center hover:bg-orange-600 rounded-md transition-colors"
              >
                <Plus size={12} className="md:w-4 md:h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
