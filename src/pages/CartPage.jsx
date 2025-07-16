import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { FaTrash, FaShoppingCart } from 'react-icons/fa';
import { MdShoppingCartCheckout } from 'react-icons/md';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const { cartItems, removeFromCart, getCartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center p-4">
        <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 2,
              delay: 0.3,
              ease: [0.33, 1, 0.68, 1],
              type: "tween"
            }}
          className="text-center"
        >
          <FaShoppingCart className="w-24 h-24 mx-auto mb-8 text-gray-300" />
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">Looks like you haven't added any courses yet.</p>
          <Link
            to="/courses/search"
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors inline-flex items-center gap-2"
          >
            <FaShoppingCart />
            Browse Courses
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-[calc(100vh-200px)] max-w-7xl mx-auto px-4 py-8"
    >
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-grow">
          <div className="bg-white rounded-lg shadow-sm divide-y">
            {cartItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-4 flex flex-col sm:flex-row sm:items-center gap-4"
              >
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-gray-500 text-sm mb-2">{item.instructor}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>{item.duration}</span>
                    <span>•</span>
                    <span>{item.level}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-2xl font-bold text-green-600">${item.price}</p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-600 p-2 hover:bg-red-50 rounded-full transition-colors"
                    aria-label="Remove from cart"
                  >
                    <FaTrash />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-96">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Discount</span>
                <span className="font-semibold text-green-600">-$0.00</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-lg font-bold text-green-600">
                    ${getCartTotal().toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            <button 
              className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
              onClick={() => {
                // Add checkout logic here
                alert('Proceeding to checkout...');
              }}
            >
              <MdShoppingCartCheckout className="text-xl" />
              Checkout Now
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CartPage;
