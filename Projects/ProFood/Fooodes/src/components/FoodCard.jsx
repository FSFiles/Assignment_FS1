import React, { useState } from 'react';
import { Star, Plus, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

export default function FoodCard({ item }) {
  const { addToCart, cartItems } = useCart();
  const [adding, setAdding] = useState(false);
  const inCart = cartItems.find(i => i.id === item.id);

  const handleAdd = () => {
    addToCart(item);
    setAdding(true);
    toast.success(`${item.name} added to cart! 🛒`);
    setTimeout(() => setAdding(false), 1500);
  };

  return (
    <div className="glass rounded-2xl overflow-hidden card-hover group">
      {/* Image */}
      <div className="relative h-44 bg-gradient-to-br from-orange-500/10 to-yellow-400/10 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-6xl select-none">
          {item.emoji}
        </div>
        {item.badge && (
          <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
            {item.badge}
          </span>
        )}
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-semibold text-white">{item.rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-white text-base mb-1 truncate">{item.name}</h3>
        <p className="text-gray-400 text-xs mb-1">{item.restaurant}</p>
        <p className="text-gray-500 text-xs mb-3 line-clamp-2">{item.desc}</p>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-orange-400 font-black text-lg">₹{item.price}</span>
            {item.originalPrice && (
              <span className="text-gray-500 text-xs line-through ml-2">₹{item.originalPrice}</span>
            )}
          </div>
          <button
            onClick={handleAdd}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
              inCart
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'bg-orange-500 hover:bg-orange-400 text-white glow-orange'
            }`}
          >
            {adding ? (
              <><Check className="w-4 h-4" /> Added</>
            ) : inCart ? (
              <><Check className="w-4 h-4" /> In Cart</>
            ) : (
              <><Plus className="w-4 h-4" /> Add</>
            )}
          </button>
        </div>

        <div className="flex items-center gap-3 mt-3 text-xs text-gray-500">
          <span>🕐 {item.time}</span>
          <span>📍 {item.distance}</span>
        </div>
      </div>
    </div>
  );
}
