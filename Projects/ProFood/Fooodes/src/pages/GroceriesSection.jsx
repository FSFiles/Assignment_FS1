import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, SlidersHorizontal, Leaf, Zap, Tag } from 'lucide-react';
import Navbar from '../components/Navbar';
import GroceryCard from '../components/GroceryCard';
import { useAuth } from '../context/AuthContext';

const categories = ['All', 'Fruits & Veg', 'Dairy', 'Snacks', 'Beverages', 'Bakery', 'Staples', 'Personal Care', 'Frozen'];

const groceryItems = [
  // Fruits & Veg
  { id: 'g1', name: 'Fresh Tomatoes', emoji: '🍅', price: 35, originalPrice: 50, weight: '500g', category: 'Fruits & Veg', organic: true, discount: 30 },
  { id: 'g2', name: 'Banana Bunch', emoji: '🍌', price: 45, originalPrice: null, weight: '1 dozen', category: 'Fruits & Veg', organic: false, discount: null },
  { id: 'g3', name: 'Baby Spinach', emoji: '🥬', price: 55, originalPrice: 70, weight: '250g', category: 'Fruits & Veg', organic: true, discount: 21 },
  { id: 'g4', name: 'Red Apples', emoji: '🍎', price: 149, originalPrice: 199, weight: '1 kg', category: 'Fruits & Veg', organic: false, discount: 25 },
  // Dairy
  { id: 'g5', name: 'Full Cream Milk', emoji: '🥛', price: 65, originalPrice: null, weight: '1 litre', category: 'Dairy', organic: false, discount: null },
  { id: 'g6', name: 'Amul Butter', emoji: '🧈', price: 58, originalPrice: 65, weight: '100g', category: 'Dairy', organic: false, discount: 11 },
  { id: 'g7', name: 'Greek Yogurt', emoji: '🍶', price: 89, originalPrice: 110, weight: '400g', category: 'Dairy', organic: true, discount: 19 },
  { id: 'g8', name: 'Paneer Fresh', emoji: '🧀', price: 99, originalPrice: null, weight: '200g', category: 'Dairy', organic: false, discount: null },
  // Snacks
  { id: 'g9', name: 'Lays Classic Salted', emoji: '🥔', price: 20, originalPrice: null, weight: '26g', category: 'Snacks', organic: false, discount: null },
  { id: 'g10', name: 'Mixed Nuts', emoji: '🥜', price: 299, originalPrice: 399, weight: '500g', category: 'Snacks', organic: true, discount: 25 },
  { id: 'g11', name: 'Dark Chocolate', emoji: '🍫', price: 149, originalPrice: 180, weight: '100g', category: 'Snacks', organic: false, discount: 17 },
  // Beverages
  { id: 'g12', name: 'Orange Juice', emoji: '🍊', price: 99, originalPrice: 120, weight: '1 litre', category: 'Beverages', organic: true, discount: 18 },
  { id: 'g13', name: 'Green Tea', emoji: '🍵', price: 149, originalPrice: null, weight: '25 bags', category: 'Beverages', organic: true, discount: null },
  { id: 'g14', name: 'Coconut Water', emoji: '🥥', price: 45, originalPrice: 55, weight: '500ml', category: 'Beverages', organic: false, discount: 18 },
  // Bakery
  { id: 'g15', name: 'Whole Wheat Bread', emoji: '🍞', price: 55, originalPrice: null, weight: '400g', category: 'Bakery', organic: false, discount: null },
  { id: 'g16', name: 'Croissants', emoji: '🥐', price: 79, originalPrice: 99, weight: '2 pcs', category: 'Bakery', organic: false, discount: 20 },
  // Staples
  { id: 'g17', name: 'Basmati Rice', emoji: '🍚', price: 249, originalPrice: 320, weight: '5 kg', category: 'Staples', organic: true, discount: 22 },
  { id: 'g18', name: 'Toor Dal', emoji: '🫘', price: 129, originalPrice: null, weight: '1 kg', category: 'Staples', organic: false, discount: null },
];

export default function GroceriesSection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const { user } = useAuth();

  const filtered = groceryItems.filter(item => {
    const matchCat = activeCategory === 'All' || item.category === activeCategory;
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-main">
      <Navbar />

      <div className="pt-16">
        {/* Hero Banner */}
        <div className="relative bg-gradient-to-r from-green-600/20 via-emerald-500/10 to-lime-500/10 border-b border-green-500/10 px-6 py-8 overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-green-400 font-semibold text-sm mb-1">
                📍 {user?.location || 'Your City'} • Hey {user?.name || 'there'}! 👋
              </p>
              <h2 className="text-3xl font-black text-white">
                🛒 Shop <span className="text-green-400">Groceries</span>
              </h2>
              <p className="text-gray-400 text-sm mt-1">Farm fresh delivered in 30 minutes</p>
            </div>
            <div className="flex items-center gap-4 text-center">
              <div className="glass rounded-xl px-5 py-3">
                <div className="text-green-400 font-black text-xl">10 min</div>
                <div className="text-gray-400 text-xs">Avg Delivery</div>
              </div>
              <div className="glass rounded-xl px-5 py-3">
                <div className="text-green-400 font-black text-xl">5000+</div>
                <div className="text-gray-400 text-xs">Products</div>
              </div>
              <Link to="/food" className="hidden md:block btn-secondary text-sm py-2 px-4 border-green-500 text-green-400 hover:bg-green-500/10">
                🍕 Order Food
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          {/* Search */}
          <div className="flex gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search grocery items..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="input-field pl-12"
              />
            </div>
            <button className="p-3 glass rounded-xl hover:border-green-500/30 transition-all">
              <SlidersHorizontal className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Category Pills */}
          <div className="flex gap-3 overflow-x-auto pb-3 mb-6">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`category-pill shrink-0 ${activeCategory === cat ? 'bg-gradient-to-r from-green-600 to-green-500 text-white border-transparent shadow-lg' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Offers Row */}
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {[
              { icon: '🌿', title: 'Organic Range', desc: 'Certified organic products', color: 'border-green-500/30 bg-green-500/5' },
              { icon: '⚡', title: '10-min Delivery', desc: 'Groceries at lightning speed', color: 'border-yellow-500/30 bg-yellow-500/5' },
              { icon: '🏷️', title: 'Daily Deals', desc: 'Up to 40% off every day', color: 'border-orange-500/30 bg-orange-500/5' },
            ].map(o => (
              <div key={o.title} className={`glass rounded-2xl p-4 border ${o.color} flex items-center gap-3`}>
                <span className="text-3xl">{o.icon}</span>
                <div>
                  <p className="text-white font-bold text-sm">{o.title}</p>
                  <p className="text-gray-400 text-xs">{o.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filtered.map(item => (
                <div key={item.id} className="animate-slide-up">
                  <GroceryCard item={item} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-gray-400 text-lg">No items found for "{search}"</p>
              <button onClick={() => { setSearch(''); setActiveCategory('All'); }} className="btn-primary mt-4 text-sm py-2 px-6 bg-gradient-to-r from-green-600 to-green-500">Clear Search</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
