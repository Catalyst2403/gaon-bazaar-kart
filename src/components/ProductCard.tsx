
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { useCart } from "../hooks/useCart";

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

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const { cartItems, updateQuantity } = useCart();
  const cartItem = cartItems.find(item => item.id === product.id);
  const isInCart = !!cartItem;
  const currentQuantity = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    onAddToCart(product, 1);
  };

  const handleIncrement = () => {
    updateQuantity(product.id, currentQuantity + 1);
  };

  const handleDecrement = () => {
    if (currentQuantity > 1) {
      updateQuantity(product.id, currentQuantity - 1);
    } else {
      updateQuantity(product.id, 0); // This will remove the item
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 text-sm md:text-base">{product.name}</h3>
        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-bold text-orange-600">
            ₹{product.price}
            {product.unit && <span className="text-sm text-gray-500">/{product.unit}</span>}
          </span>
        </div>
        
        <div className="flex items-center justify-center">
          {!isInCart ? (
            <button
              onClick={handleAddToCart}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors w-full justify-center"
            >
              <Plus size={16} />
              <span>Add to Cart</span>
            </button>
          ) : (
            <div className="flex items-center justify-center space-x-3 w-full">
              <button
                onClick={handleDecrement}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
              >
                <Minus size={16} />
              </button>
              <span className="text-lg font-semibold min-w-8 text-center">{currentQuantity}</span>
              <button
                onClick={handleIncrement}
                className="bg-orange-500 hover:bg-orange-600 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
