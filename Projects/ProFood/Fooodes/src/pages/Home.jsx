import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Clock, Shield, Star, Zap, ChevronRight } from 'lucide-react';

const features = [
  { icon: '⚡', title: 'Lightning Fast', desc: '30-min delivery guarantee on food orders' },
  { icon: '🌿', title: 'Farm Fresh', desc: 'Groceries sourced directly from farmers' },
  { icon: '🔒', title: '100% Secure', desc: 'Safe payments & quality assured products' },
  { icon: '🎁', title: 'Best Deals', desc: 'Daily offers up to 60% off on top items' },
];

const testimonials = [
  { name: 'Priya S.', city: 'Mumbai', text: 'Fastest delivery I\'ve ever experienced! Love the fresh groceries.', rating: 5 },
  { name: 'Rahul K.', city: 'Bangalore', text: 'Amazing variety of food. My go-to app for ordering!', rating: 5 },
  { name: 'Sneha M.', city: 'Delhi', text: 'Best grocery prices in the city. Super convenient!', rating: 5 },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-main">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-orange-500/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-yellow-400 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-lg">🍽️</span>
            </div>
            <span className="text-xl font-black gradient-text">ProFood</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="btn-secondary text-sm py-2 px-5">Login</Link>
            <Link to="/login" className="btn-primary text-sm py-2 px-5">Sign Up</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16 bg-gradient-hero">
        {/* Blobs */}
        <div className="blob-1 -top-20 -left-20 opacity-60" />
        <div className="blob-2 bottom-20 right-10" />
        <div className="blob-1 top-1/2 right-1/4 opacity-30 w-64 h-64" />

        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="animate-slide-up space-y-8">
              <div className="inline-flex items-center gap-2 glass-light px-4 py-2 rounded-full text-sm text-orange-400">
                <Zap className="w-4 h-4" />
                <span>30-min delivery in your city</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
                <span className="text-white">Delicious</span>
                <br />
                <span className="gradient-text">Food & Fresh</span>
                <br />
                <span className="text-white">Groceries</span>
              </h1>

              <p className="text-gray-400 text-lg max-w-md leading-relaxed">
                Order from top restaurants & get fresh groceries delivered to your doorstep in minutes. 
                100% fresh, fast & affordable!
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/login" className="btn-primary flex items-center gap-2 text-base px-8 py-4">
                  <ShoppingBag className="w-5 h-5" />
                  Order Food Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/login" className="btn-secondary flex items-center gap-2 text-base px-8 py-4">
                  🛒 Shop Groceries
                </Link>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 pt-4">
                {[
                  { value: '50K+', label: 'Happy Customers' },
                  { value: '500+', label: 'Restaurants' },
                  { value: '30 min', label: 'Avg Delivery' },
                ].map(stat => (
                  <div key={stat.label}>
                    <div className="text-2xl font-black gradient-text">{stat.value}</div>
                    <div className="text-gray-500 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Food Illustration */}
            <div className="relative hidden lg:flex items-center justify-center animate-float">
              <div className="relative w-96 h-96">
                {/* Main circle */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-500/20 to-yellow-400/10 animate-pulse-glow" />
                {/* Center food emoji */}
                <div className="absolute inset-0 flex items-center justify-center text-9xl">🍕</div>
                {/* Orbiting food items */}
                {['🍔', '🍜', '🥗', '🧁', '🍱'].map((emoji, i) => (
                  <div
                    key={i}
                    className="absolute text-4xl"
                    style={{
                      top: `${50 + 42 * Math.sin((i / 5) * 2 * Math.PI)}%`,
                      left: `${50 + 42 * Math.cos((i / 5) * 2 * Math.PI)}%`,
                      transform: 'translate(-50%, -50%)',
                      animation: `float ${2.5 + i * 0.4}s ease-in-out infinite`,
                      animationDelay: `${i * 0.3}s`,
                    }}
                  >
                    {emoji}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-gray-500 text-xs">Scroll down</span>
          <div className="w-0.5 h-8 bg-gradient-to-b from-orange-500 to-transparent" />
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black text-white mb-4">
              What are you <span className="gradient-text">craving?</span>
            </h2>
            <p className="text-gray-400">Choose from hundreds of categories</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {[
              { emoji: '🍕', name: 'Pizza', color: 'from-red-500/20 to-orange-500/20' },
              { emoji: '🍔', name: 'Burgers', color: 'from-yellow-500/20 to-orange-500/20' },
              { emoji: '🍜', name: 'Chinese', color: 'from-red-500/20 to-pink-500/20' },
              { emoji: '🍱', name: 'Biryani', color: 'from-orange-500/20 to-yellow-500/20' },
              { emoji: '🥗', name: 'Salads', color: 'from-green-500/20 to-emerald-500/20' },
              { emoji: '🧁', name: 'Desserts', color: 'from-pink-500/20 to-purple-500/20' },
            ].map(cat => (
              <Link key={cat.name} to="/login" className="group">
                <div className={`glass rounded-2xl p-5 text-center card-hover bg-gradient-to-br ${cat.color} border border-white/5 group-hover:border-orange-500/30`}>
                  <div className="text-4xl mb-2">{cat.emoji}</div>
                  <div className="text-sm font-semibold text-gray-300 group-hover:text-white">{cat.name}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="blob-1 bottom-0 left-0 opacity-40" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black text-white mb-4">
              Why choose <span className="gradient-text">ProFood?</span>
            </h2>
            <p className="text-gray-400">We make ordering food & groceries effortless</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div key={f.title} className="glass rounded-2xl p-6 card-hover text-center" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="text-5xl mb-4">{f.icon}</div>
                <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black text-white mb-4">
              Loved by <span className="gradient-text">50,000+</span> customers
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="glass rounded-2xl p-6 card-hover">
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-yellow-400 rounded-full flex items-center justify-center font-bold text-white text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{t.name}</div>
                    <div className="text-gray-500 text-xs">{t.city}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-3xl p-12 text-center relative overflow-hidden glow-orange">
            <div className="blob-1 -top-20 -left-20 opacity-30" />
            <div className="relative z-10">
              <div className="text-5xl mb-4">🚀</div>
              <h2 className="text-4xl font-black text-white mb-4">Ready to Order?</h2>
              <p className="text-gray-400 mb-8 text-lg">Join 50,000+ happy customers. Get your first order free!</p>
              <Link to="/login" className="btn-primary inline-flex items-center gap-2 text-lg px-10 py-4">
                Get Started Free <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🍽️</span>
            <span className="font-black gradient-text text-xl">ProFood</span>
          </div>
          <p className="text-gray-500 text-sm">© 2026 ProFood. All rights reserved.</p>
          <div className="flex gap-4 text-gray-500 text-sm">
            <a href="#" className="hover:text-orange-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-orange-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-orange-400 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
