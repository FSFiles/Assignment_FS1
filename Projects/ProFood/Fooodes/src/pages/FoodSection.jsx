import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, SlidersHorizontal, ShoppingCart, Star, Clock, Flame } from 'lucide-react';
import Navbar from '../components/Navbar';
import FoodCard from '../components/FoodCard';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const categories = ['All', 'Biryani', 'Pizza', 'Burgers', 'Chinese', 'South Indian', 'Desserts', 'Rolls', 'Pasta', 'Sandwiches'];

const foodItems = [
  { id: 'f1', name: 'Chicken Biryani', emoji: '🍛', price: 249, originalPrice: 320, rating: 4.8, restaurant: 'Biryani Blues', desc: 'Aromatic basmati rice cooked with tender chicken & whole spices', time: '30 min', distance: '2.1 km', category: 'Biryani', badge: 'Bestseller' },
  { id: 'f2', name: 'Margherita Pizza', emoji: '🍕', price: 299, originalPrice: 380, rating: 4.6, restaurant: 'Pizza Palace', desc: 'Classic tomato base, mozzarella & fresh basil on thin crust', time: '25 min', distance: '1.8 km', category: 'Pizza', badge: null },
  { id: 'f3', name: 'Veg Burger', emoji: '🍔', price: 149, originalPrice: null, rating: 4.4, restaurant: 'Burger Barn', desc: 'Crispy veggie patty with fresh lettuce, tomato & special sauce', time: '20 min', distance: '1.2 km', category: 'Burgers', badge: '🔥 Trending' },
  { id: 'f4', name: 'Hakka Noodles', emoji: '🍜', price: 189, originalPrice: 220, rating: 4.5, restaurant: 'Dragon Wok', desc: 'Stir-fried noodles with crispy vegetables & soy sauce', time: '20 min', distance: '2.5 km', category: 'Chinese', badge: null },
  { id: 'f5', name: 'Masala Dosa', emoji: '🥞', price: 129, originalPrice: null, rating: 4.7, restaurant: 'South Spice', desc: 'Crispy golden dosa with spiced potato filling & chutneys', time: '15 min', distance: '1.5 km', category: 'South Indian', badge: 'Pure Veg' },
  { id: 'f6', name: 'Chocolate Lava Cake', emoji: '🧁', price: 159, originalPrice: 200, rating: 4.9, restaurant: 'Dessert Den', desc: 'Warm chocolate cake with molten center & vanilla ice cream', time: '25 min', distance: '3 km', category: 'Desserts', badge: '❤️ Fan Fav' },
  { id: 'f7', name: 'Paneer Tikka Roll', emoji: '🌯', price: 179, originalPrice: 220, rating: 4.5, restaurant: 'Roll Republic', desc: 'Grilled paneer tikka wrapped in flaky paratha with mint chutney', time: '20 min', distance: '1.9 km', category: 'Rolls', badge: null },
  { id: 'f8', name: 'Pasta Arrabbiata', emoji: '🍝', price: 259, originalPrice: 299, rating: 4.3, restaurant: 'Italiano', desc: 'Penne pasta in spicy tomato & garlic sauce with herbs', time: '30 min', distance: '2.8 km', category: 'Pasta', badge: null },
  { id: 'f9', name: 'Club Sandwich', emoji: '🥪', price: 199, originalPrice: null, rating: 4.4, restaurant: 'Cafe Crunch', desc: 'Triple-decker sandwich with chicken, egg, veggies & mayo', time: '15 min', distance: '1.1 km', category: 'Sandwiches', badge: null },
  { id: 'f10', name: 'Mutton Biryani', emoji: '🍲', price: 329, originalPrice: 400, rating: 4.9, restaurant: 'Nawab\'s Kitchen', desc: 'Slow-cooked mutton with fragrant rice & fried onions', time: '40 min', distance: '3.2 km', category: 'Biryani', badge: 'Chef\'s Special' },
  { id: 'f11', name: 'Pepperoni Pizza', emoji: '🍕', price: 349, originalPrice: 420, rating: 4.7, restaurant: 'Pizza Palace', desc: 'Loaded with pepperoni, jalapeños & extra cheese', time: '25 min', distance: '1.8 km', category: 'Pizza', badge: null },
  { id: 'f12', name: 'Gulab Jamun', emoji: '🍮', price: 89, originalPrice: null, rating: 4.8, restaurant: 'Mithai Box', desc: 'Soft khoya balls soaked in rose sugar syrup', time: '20 min', distance: '2 km', category: 'Desserts', badge: '🍬 Sweet' },
];

export default function FoodSection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const { user } = useAuth();
  const { totalItems } = useCart();

  const filtered = foodItems.filter(item => {
    const matchCat = activeCategory === 'All' || item.category === activeCategory;
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
                        item.restaurant.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-main">
      <Navbar />

      <div className="pt-16">
        {/* Hero Banner */}
        <div className="relative bg-gradient-to-r from-orange-600/20 via-orange-500/10 to-yellow-500/10 border-b border-orange-500/10 px-6 py-8 overflow-hidden">
          <div className="blob-1 -top-20 right-10 opacity-30 w-64 h-64" />
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-orange-400 font-semibold text-sm mb-1">
                📍 {user?.location || 'Your City'} • Hey {user?.name || 'there'}! 👋
              </p>
              <h2 className="text-3xl font-black text-white">
                🍕 Order <span className="gradient-text">Food</span>
              </h2>
              <p className="text-gray-400 text-sm mt-1">Fresh & hot from top restaurants</p>
            </div>
            <div className="flex items-center gap-4 text-center">
              <div className="glass rounded-xl px-5 py-3">
                <div className="text-orange-400 font-black text-xl">30 min</div>
                <div className="text-gray-400 text-xs">Avg Delivery</div>
              </div>
              <div className="glass rounded-xl px-5 py-3">
                <div className="text-orange-400 font-black text-xl">500+</div>
                <div className="text-gray-400 text-xs">Restaurants</div>
              </div>
              <Link to="/groceries" className="hidden md:block btn-secondary text-sm py-2 px-4">
                🛒 Groceries
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
                placeholder="Search food, restaurants..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="input-field pl-12"
              />
            </div>
            <button className="p-3 glass rounded-xl hover:border-orange-500/30 transition-all">
              <SlidersHorizontal className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Category Pills */}
          <div className="flex gap-3 overflow-x-auto pb-3 mb-8 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`category-pill shrink-0 ${activeCategory === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Trending Banner */}
          <div className="glass rounded-2xl p-4 mb-8 flex items-center gap-4 border border-orange-500/20 overflow-hidden relative">
            <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center shrink-0">
              <Flame className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <p className="text-white font-bold">🔥 Trending Now</p>
              <p className="text-gray-400 text-sm">Biryani is the most ordered item in {user?.location || 'your city'} today!</p>
            </div>
            <div className="ml-auto hidden sm:block text-4xl animate-float">🍛</div>
          </div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map(item => (
                <div key={item.id} className="animate-slide-up">
                  <FoodCard item={item} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-gray-400 text-lg">No food found for "{search}"</p>
              <button onClick={() => { setSearch(''); setActiveCategory('All'); }} className="btn-primary mt-4 text-sm py-2 px-6">Clear Search</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
