import { useState } from 'react'
import { useApp } from '../context/AppContext'
import ProductCard from '../components/ProductCard'
import { foodItems, groceryItems } from '../data/products'
import { Link } from 'react-router-dom'

const FOOD_CATS = ['All', 'Biryani', 'Pizza', 'Dosa', 'Desserts', 'Drinks']

export default function ShopPage() {
  const { user, cartCount, cartTotal } = useApp()
  const [section, setSection] = useState('food') // food | grocery
  const [foodSearch, setFoodSearch] = useState('')
  const [grocerySearch, setGrocerySearch] = useState('')

  const filteredFood = foodItems.filter(i =>
    i.name.toLowerCase().includes(foodSearch.toLowerCase()) ||
    i.desc.toLowerCase().includes(foodSearch.toLowerCase())
  )
  const filteredGrocery = groceryItems.filter(i =>
    i.name.toLowerCase().includes(grocerySearch.toLowerCase()) ||
    i.desc.toLowerCase().includes(grocerySearch.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-warm pb-28">
      {/* Welcome banner */}
      <div className="bg-gradient-to-r from-primary to-orange-400 text-white px-4 py-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-white/80 text-sm font-medium">Good {getGreeting()},</p>
          <h2 className="font-display text-2xl font-bold">{user?.name || 'Friend'} 👋</h2>
          <p className="text-white/70 text-sm mt-1">📍 {user?.city || 'Select city'} • Delivery in 30 min</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 pt-6">
        {/* Section switcher */}
        <div className="flex bg-gray-100 p-1 rounded-2xl mb-6 gap-1">
          <button
            onClick={() => setSection('food')}
            className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
              section === 'food' ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            🍽️ Food
          </button>
          <button
            onClick={() => setSection('grocery')}
            className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
              section === 'grocery' ? 'bg-teal text-white shadow-lg shadow-teal/30' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            🛒 Groceries
          </button>
        </div>

        {/* ── FOOD SECTION ── */}
        {section === 'food' && (
          <div className="animate-fadeInUp">
            {/* Hero banner */}
            <div className="rounded-3xl bg-gradient-to-r from-orange-100 to-yellow-50 border border-orange-100 p-6 mb-6 flex items-center justify-between">
              <div>
                <p className="text-primary font-bold text-sm">Today's Special 🔥</p>
                <h3 className="font-display text-2xl font-bold text-gray-900 mt-1">Biryani &amp; more<br/>from ₹149</h3>
                <p className="text-gray-500 text-sm mt-1">Free delivery on orders above ₹299</p>
              </div>
              <span className="text-7xl">🍛</span>
            </div>

            {/* Search */}
            <div className="relative mb-5">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🔍</span>
              <input type="text" placeholder="Search food items..." value={foodSearch}
                onChange={e => setFoodSearch(e.target.value)}
                className="w-full bg-white border-2 border-gray-100 rounded-2xl pl-11 pr-4 py-3 font-semibold focus:outline-none focus:border-primary transition-all" />
            </div>

            <h2 className="section-title mb-4">🍽️ Order Food</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredFood.map(item => <ProductCard key={item.id} item={item} type="food" />)}
            </div>
            {filteredFood.length === 0 && (
              <div className="text-center py-16 text-gray-400">
                <p className="text-5xl mb-3">🍽️</p><p>No food items found</p>
              </div>
            )}
          </div>
        )}

        {/* ── GROCERY SECTION ── */}
        {section === 'grocery' && (
          <div className="animate-fadeInUp">
            {/* Hero banner */}
            <div className="rounded-3xl bg-gradient-to-r from-teal/10 to-green-50 border border-teal/20 p-6 mb-6 flex items-center justify-between">
              <div>
                <p className="text-teal font-bold text-sm">Farm Fresh 🌿</p>
                <h3 className="font-display text-2xl font-bold text-gray-900 mt-1">Groceries<br/>delivered fast</h3>
                <p className="text-gray-500 text-sm mt-1">100% fresh. No compromises.</p>
              </div>
              <span className="text-7xl">🥬</span>
            </div>

            {/* Search */}
            <div className="relative mb-5">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🔍</span>
              <input type="text" placeholder="Search groceries..." value={grocerySearch}
                onChange={e => setGrocerySearch(e.target.value)}
                className="w-full bg-white border-2 border-gray-100 rounded-2xl pl-11 pr-4 py-3 font-semibold focus:outline-none focus:border-teal transition-all" />
            </div>

            <h2 className="section-title mb-4">🛒 Fresh Groceries</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredGrocery.map(item => <ProductCard key={item.id} item={item} type="grocery" />)}
            </div>
            {filteredGrocery.length === 0 && (
              <div className="text-center py-16 text-gray-400">
                <p className="text-5xl mb-3">🛒</p><p>No groceries found</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Floating Cart Bar */}
      {cartCount > 0 && (
        <div className="fixed bottom-6 left-4 right-4 max-w-xl mx-auto z-50 animate-fadeInUp">
          <Link to="/cart" className="flex items-center justify-between bg-primary text-white px-5 py-4 rounded-2xl shadow-2xl shadow-primary/40 hover:bg-primary-dark transition-colors">
            <div className="flex items-center gap-3">
              <span className="bg-white/20 rounded-xl px-2 py-1 text-sm font-bold">{cartCount} item{cartCount>1?'s':''}</span>
              <span className="font-bold">View Cart</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg">₹{cartTotal}</span>
              <span>→</span>
            </div>
          </Link>
        </div>
      )}
    </div>
  )
}

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'morning'
  if (h < 17) return 'afternoon'
  return 'evening'
}
