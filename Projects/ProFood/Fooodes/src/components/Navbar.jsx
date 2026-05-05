import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, User, UtensilsCrossed, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

export default function Navbar() {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-orange-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/food" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-yellow-400 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <UtensilsCrossed className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black gradient-text">ProFood</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/food"
              className={`text-sm font-500 transition-all px-3 py-1.5 rounded-full ${isActive('/food') ? 'bg-orange-500/20 text-orange-400' : 'text-gray-300 hover:text-orange-400'}`}
            >
              🍕 Food
            </Link>
            <Link
              to="/groceries"
              className={`text-sm font-500 transition-all px-3 py-1.5 rounded-full ${isActive('/groceries') ? 'bg-orange-500/20 text-orange-400' : 'text-gray-300 hover:text-orange-400'}`}
            >
              🛒 Groceries
            </Link>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Cart */}
            <Link to="/cart" className="relative p-2.5 glass-light rounded-xl hover:border-orange-500/40 transition-all group">
              <ShoppingCart className="w-5 h-5 text-gray-300 group-hover:text-orange-400 transition-colors" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-orange-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-bounce-in">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Profile */}
            {user && (
              <div className="relative group">
                <Link to="/profile" className="flex items-center gap-2 p-2 glass-light rounded-xl hover:border-orange-500/40 transition-all" id="profile-icon">
                  <div className="w-7 h-7 bg-gradient-to-br from-orange-500 to-yellow-400 rounded-full flex items-center justify-center text-xs font-bold text-white">
                    {(user.name || 'U')[0].toUpperCase()}
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-gray-200">{user.name || 'Profile'}</span>
                </Link>
                <div className="absolute right-0 top-full mt-2 w-44 glass rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden">
                  <Link to="/profile" className="block px-4 py-3 text-sm text-gray-200 hover:bg-orange-500/10 hover:text-orange-400 transition-colors">
                    <User className="w-4 h-4 inline mr-2" />My Profile
                  </Link>
                  <Link to="/cart" className="block px-4 py-3 text-sm text-gray-200 hover:bg-orange-500/10 hover:text-orange-400 transition-colors">
                    <ShoppingCart className="w-4 h-4 inline mr-2" />My Cart
                  </Link>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors">
                    Logout
                  </button>
                </div>
              </div>
            )}

            {/* Mobile menu */}
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 glass-light rounded-xl">
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden glass border-t border-orange-500/10 animate-slide-up">
          <div className="px-4 py-3 space-y-2">
            <Link to="/food" onClick={() => setMenuOpen(false)} className="block px-4 py-3 rounded-xl text-gray-200 hover:bg-orange-500/10 hover:text-orange-400 transition-colors">
              🍕 Food
            </Link>
            <Link to="/groceries" onClick={() => setMenuOpen(false)} className="block px-4 py-3 rounded-xl text-gray-200 hover:bg-orange-500/10 hover:text-orange-400 transition-colors">
              🛒 Groceries
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
