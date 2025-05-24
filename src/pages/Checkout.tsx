
import { useState } from 'react';
import { useCart } from '../hooks/useCart';
import { Link, useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [customerDetails, setCustomerDetails] = useState({
    fullName: '',
    address: '',
    mobileNumber: ''
  });
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const upiId = "freshmart@okaxis"; // Replace with your actual UPI ID

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomerDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleConfirmOrder = () => {
    if (!customerDetails.fullName || !customerDetails.address || !customerDetails.mobileNumber) {
      alert('Please fill in all required fields');
      return;
    }

    // Save order details (you can integrate with Google Sheets or Firebase here)
    const orderData = {
      id: Date.now().toString(),
      customer: customerDetails,
      items: cartItems,
      total: getTotalPrice(),
      timestamp: new Date().toISOString(),
      status: 'pending'
    };

    // Save to localStorage for now (you can replace this with actual backend integration)
    const existingOrders = JSON.parse(localStorage.getItem('freshmart-orders') || '[]');
    existingOrders.push(orderData);
    localStorage.setItem('freshmart-orders', JSON.stringify(existingOrders));

    console.log('Order placed:', orderData);
    
    clearCart();
    setIsOrderPlaced(true);
  };

  // Generate QR code URL for UPI payment
  const generateQRCode = () => {
    const upiString = `upi://pay?pa=${upiId}&pn=FreshMart&am=${getTotalPrice()}&cu=INR&tn=Payment for FreshMart Order`;
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiString)}`;
  };

  if (cartItems.length === 0 && !isOrderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-8xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Add some items to proceed with checkout</p>
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

  if (isOrderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full mx-4 text-center">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-green-600 mb-4">Order Confirmed!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your order! We'll deliver your fresh groceries soon.
          </p>
          <p className="text-sm text-gray-500 mb-8">
            You'll receive a confirmation call within 15 minutes.
          </p>
          <Link
            to="/"
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-block"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₹{item.price * item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center text-xl font-bold">
                <span>Total:</span>
                <span className="text-orange-600">₹{getTotalPrice()}</span>
              </div>
            </div>
          </div>

          {/* Customer Details & Payment */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Delivery Details</h2>
            
            <form className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={customerDetails.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Delivery Address *
                </label>
                <textarea
                  name="address"
                  value={customerDetails.address}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  name="mobileNumber"
                  value={customerDetails.mobileNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>
            </form>

            {/* Payment Section */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Payment</h3>
              
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Pay using UPI:</p>
                  <p className="text-lg font-bold text-orange-600 mb-2">{upiId}</p>
                  <p className="text-2xl font-bold text-gray-800 mb-3">₹{getTotalPrice()}</p>
                  
                  {/* QR Code Toggle */}
                  <button
                    onClick={() => setShowQR(!showQR)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm mb-3 transition-colors"
                  >
                    {showQR ? 'Hide QR Code' : 'Show QR Code'}
                  </button>
                  
                  {showQR && (
                    <div className="mb-3">
                      <img
                        src={generateQRCode()}
                        alt="UPI Payment QR Code"
                        className="mx-auto border border-gray-300 rounded-lg"
                      />
                      <p className="text-xs text-gray-500 mt-2">
                        Scan this QR code with any UPI app to pay
                      </p>
                    </div>
                  )}
                  
                  <p className="text-xs text-gray-500">
                    Please pay the total amount using the UPI ID shown above and confirm the payment.
                  </p>
                </div>
              </div>
              
              <button
                onClick={handleConfirmOrder}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold text-lg transition-colors"
              >
                Confirm Order ✅
              </button>
              
              <p className="text-xs text-gray-500 text-center mt-4">
                By confirming, you agree that you have made the payment via UPI
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
