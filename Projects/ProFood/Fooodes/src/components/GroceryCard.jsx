import React, { useState } from 'react';
import { Plus, Check, Leaf } from 'lucide-react';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

export default function GroceryCard({ item }) {
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
      <div className="relative h-36 bg-gradient-to-br from-green-500/10 to-emerald-400/10 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-5xl select-none">
          {item.emoji}
        </div>
        {item.organic && (
          <span className="absolute top-2 left-2 flex items-center gap-1 bg-green-500/80 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            <Leaf className="w-3 h-3" /> Organic
          </span>
        )}
        {item.discount && (
          <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            -{item.discount}%
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-3">
        <h3 className="font-bold text-white text-sm mb-0.5 truncate">{item.name}</h3>
        <p className="text-gray-500 text-xs mb-2">{item.weight}</p>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-green-400 font-black text-base">₹{item.price}</span>
            {item.originalPrice && (
              <span className="text-gray-500 text-xs line-through ml-1.5">₹{item.originalPrice}</span>
            )}
          </div>
          <button
            onClick={handleAdd}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 ${
              inCart
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'bg-green-500 hover:bg-green-400 text-white'
            }`}
          >
            {adding ? (
              <><Check className="w-3 h-3" /> Added</>
            ) : inCart ? (
              <><Check className="w-3 h-3" /> In Cart</>
            ) : (
              <><Plus className="w-3 h-3" /> Add</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
