import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Phone, Mail, LogOut, ShoppingBag, ChevronRight, Star, Clock, Package } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

const statusColors = {
  'Confirmed': 'text-blue-400 bg-blue-500/10 border-blue-500/30',
  'Preparing': 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30',
  'On the way': 'text-orange-400 bg-orange-500/10 border-orange-500/30',
  'Delivered': 'text-green-400 bg-green-500/10 border-green-500/30',
};

const paymentIcons = { cod: '💵', upi: '📱', card: '💳', netbanking: '🌐' };
const paymentLabels = { cod: 'Cash on Delivery', upi: 'UPI', card: 'Credit/Debit Card', netbanking: 'Net Banking' };

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const orders = user?.orders || [];

  return (
    <div className="min-h-screen bg-gradient-main">
      <Navbar />

      <div className="pt-16 max-w-4xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="glass rounded-3xl p-8 mb-6 relative overflow-hidden">
          <div className="blob-1 -top-20 -right-20 opacity-20 w-64 h-64" />
          <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-orange-500 to-yellow-400 flex items-center justify-center text-4xl font-black text-white shadow-2xl shadow-orange-500/30">
                {(user?.name || 'U')[0].toUpperCase()}
              </div>
              {orders.length > 0 && (
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-2 border-gray-900 animate-bounce-in">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-3xl font-black text-white mb-1">
                {user?.name || 'Food Lover'} 👋
              </h1>
              <p className="text-gray-400 text-sm mb-4">ProFood Member</p>

              <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                {user?.phone && (
                  <div className="flex items-center gap-2 glass-light rounded-xl px-4 py-2 text-sm">
                    <Phone className="w-4 h-4 text-orange-400" />
                    <span className="text-gray-300">+91 {user.phone}</span>
                  </div>
                )}
                {user?.email && (
                  <div className="flex items-center gap-2 glass-light rounded-xl px-4 py-2 text-sm">
                    <Mail className="w-4 h-4 text-orange-400" />
                    <span className="text-gray-300">{user.email}</span>
                  </div>
                )}
                {user?.location && (
                  <div className="flex items-center gap-2 glass-light rounded-xl px-4 py-2 text-sm">
                    <MapPin className="w-4 h-4 text-orange-400" />
                    <span className="text-gray-300">{user.location}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-red-400 border border-red-500/20 hover:bg-red-500/10 transition-all text-sm font-semibold"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { icon: '🛒', label: 'Total Orders', value: orders.length },
            { icon: '💰', label: 'Total Spent', value: `₹${orders.reduce((s, o) => s + (o.total || 0), 0)}` },
            { icon: '⭐', label: 'Rewards', value: `${orders.length * 50} pts` },
          ].map(stat => (
            <div key={stat.label} className="glass rounded-2xl p-5 text-center card-hover">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-xl font-black gradient-text">{stat.value}</div>
              <div className="text-gray-400 text-xs mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => navigate('/food')}
            className="glass rounded-2xl p-5 flex items-center gap-4 card-hover border border-orange-500/10 hover:border-orange-500/30 text-left"
          >
            <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center text-2xl">🍕</div>
            <div className="flex-1">
              <p className="text-white font-bold">Order Food</p>
              <p className="text-gray-400 text-sm">500+ restaurants nearby</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-500" />
          </button>
          <button
            onClick={() => navigate('/groceries')}
            className="glass rounded-2xl p-5 flex items-center gap-4 card-hover border border-green-500/10 hover:border-green-500/30 text-left"
          >
            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center text-2xl">🛒</div>
            <div className="flex-1">
              <p className="text-white font-bold">Shop Groceries</p>
              <p className="text-gray-400 text-sm">5000+ fresh products</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Order History */}
        <div className="glass rounded-3xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <Package className="w-6 h-6 text-orange-400" /> Order History
            </h2>
            <span className="text-gray-500 text-sm">{orders.length} order{orders.length !== 1 ? 's' : ''}</span>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4 animate-float">📦</div>
              <p className="text-gray-400 text-lg font-semibold mb-2">No orders yet!</p>
              <p className="text-gray-500 text-sm mb-6">Start ordering delicious food & fresh groceries</p>
              <button onClick={() => navigate('/food')} className="btn-primary py-3 px-8">
                🍕 Order Now
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order, idx) => (
                <div key={order.id || idx} className="glass-light rounded-2xl p-5 border border-white/5 hover:border-orange-500/20 transition-all">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white font-bold font-mono text-sm">#{order.id?.slice(-8) || `ORD${idx + 1}`}</span>
                        <span className={`text-xs px-2.5 py-1 rounded-full border font-semibold ${statusColors[order.status] || statusColors['Confirmed']}`}>
                          {order.status || 'Confirmed'}
                        </span>
                      </div>
                      <p className="text-gray-400 text-xs flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {order.date ? new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Just now'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-orange-400 font-black text-lg">₹{order.total}</p>
                      <p className="text-gray-500 text-xs flex items-center gap-1 justify-end">
                        {paymentIcons[order.paymentMethod]} {paymentLabels[order.paymentMethod] || 'Paid'}
                      </p>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="flex flex-wrap gap-2">
                    {(order.items || []).slice(0, 4).map((item, i) => (
                      <span key={i} className="text-xs px-3 py-1 glass rounded-full text-gray-300 border border-white/10">
                        {item.emoji} {item.name} ×{item.qty}
                      </span>
                    ))}
                    {(order.items || []).length > 4 && (
                      <span className="text-xs px-3 py-1 glass rounded-full text-gray-400 border border-white/10">
                        +{order.items.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Rate */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                    <div className="flex items-center gap-1">
                      {[1,2,3,4,5].map(s => (
                        <Star key={s} className="w-4 h-4 text-yellow-400/30 cursor-pointer hover:text-yellow-400 transition-colors" />
                      ))}
                      <span className="text-gray-500 text-xs ml-2">Rate this order</span>
                    </div>
                    <button
                      onClick={() => navigate('/food')}
                      className="text-orange-400 text-xs font-semibold hover:text-orange-300 transition-colors flex items-center gap-1"
                    >
                      Reorder <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
