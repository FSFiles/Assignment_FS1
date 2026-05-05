import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag, ChevronLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

export default function Cart() {
  const { cartItems, removeFromCart, updateQty, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const deliveryFee = cartItems.length > 0 ? 29 : 0;
  const taxes = Math.round(totalPrice * 0.05);
  const grandTotal = totalPrice + deliveryFee + taxes;

  const handleRemove = (item) => {
    removeFromCart(item.id);
    toast.success(`${item.name} removed from cart`);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-main">
        <Navbar />
        <div className="pt-16 flex flex-col items-center justify-center min-h-screen gap-6 px-4">
          <div className="text-8xl animate-float">🛒</div>
          <h2 className="text-3xl font-black text-white text-center">Your cart is empty!</h2>
          <p className="text-gray-400 text-center">Add some delicious food or fresh groceries</p>
          <div className="flex gap-4 flex-wrap justify-center">
            <Link to="/food" className="btn-primary flex items-center gap-2 py-3 px-6">
              🍕 Order Food
            </Link>
            <Link to="/groceries" className="btn-secondary flex items-center gap-2 py-3 px-6">
              🛒 Shop Groceries
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-main">
      <Navbar />

      <div className="pt-16 max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate(-1)} className="p-2 glass rounded-xl hover:border-orange-500/30 transition-all">
            <ChevronLeft className="w-5 h-5 text-gray-400" />
          </button>
          <div>
            <h1 className="text-3xl font-black text-white">🛒 My Cart</h1>
            <p className="text-gray-400 text-sm">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart</p>
          </div>
          <button onClick={() => { clearCart(); toast.success('Cart cleared'); }} className="ml-auto text-red-400 text-sm hover:text-red-300 transition-colors flex items-center gap-1">
            <Trash2 className="w-4 h-4" /> Clear All
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => (
              <div key={item.id} className="glass rounded-2xl p-5 card-hover flex gap-4">
                {/* Emoji */}
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-500/10 to-yellow-400/10 flex items-center justify-center text-3xl shrink-0">
                  {item.emoji}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-bold truncate">{item.name}</h3>
                  <p className="text-gray-500 text-sm">{item.restaurant || item.weight}</p>
                  <p className="text-orange-400 font-black mt-1">₹{item.price}</p>
                </div>

                {/* Qty Controls */}
                <div className="flex flex-col items-end justify-between gap-3">
                  <button onClick={() => handleRemove(item)} className="text-gray-500 hover:text-red-400 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      className="w-8 h-8 rounded-lg bg-orange-500/20 hover:bg-orange-500/40 text-orange-400 flex items-center justify-center transition-all"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center text-white font-bold">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      className="w-8 h-8 rounded-lg bg-orange-500 hover:bg-orange-400 text-white flex items-center justify-center transition-all"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-white font-bold">₹{item.price * item.qty}</p>
                </div>
              </div>
            ))}

            {/* Coupon */}
            <div className="glass rounded-2xl p-5 border border-dashed border-orange-500/30">
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input type="text" placeholder="Enter coupon code" className="input-field pl-11" />
                </div>
                <button className="btn-primary py-2 px-5 text-sm">Apply</button>
              </div>
              <div className="flex gap-3 mt-3 flex-wrap">
                {['FIRST50', 'FRESH20', 'SAVE30'].map(code => (
                  <span key={code} className="text-xs px-3 py-1 rounded-full border border-orange-500/30 text-orange-400 cursor-pointer hover:bg-orange-500/10 transition-colors">
                    {code}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="glass rounded-2xl p-6 sticky top-24">
              <h3 className="text-xl font-black text-white mb-6">Order Summary</h3>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-400 text-sm">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span className="text-white">₹{totalPrice}</span>
                </div>
                <div className="flex justify-between text-gray-400 text-sm">
                  <span>Delivery Fee</span>
                  <span className="text-white">₹{deliveryFee}</span>
                </div>
                <div className="flex justify-between text-gray-400 text-sm">
                  <span>Taxes & Charges (5%)</span>
                  <span className="text-white">₹{taxes}</span>
                </div>
                <div className="h-px bg-white/10 my-3" />
                <div className="flex justify-between font-black text-lg">
                  <span className="text-white">Grand Total</span>
                  <span className="gradient-text">₹{grandTotal}</span>
                </div>
              </div>

              <div className="glass-light rounded-xl p-3 mb-6 text-center">
                <p className="text-green-400 text-sm font-semibold">🎉 You're saving ₹{cartItems.reduce((s, i) => s + ((i.originalPrice || i.price) - i.price) * i.qty, 0)} on this order!</p>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="btn-primary w-full flex items-center justify-center gap-2 py-4 text-base"
              >
                <ShoppingBag className="w-5 h-5" />
                Proceed to Buy
                <ArrowRight className="w-5 h-5" />
              </button>

              <div className="flex items-center justify-center gap-4 mt-4 text-gray-500 text-xs">
                <span>🔒 Secure</span>
                <span>•</span>
                <span>📦 Insured</span>
                <span>•</span>
                <span>↩️ Easy Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
