import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, ArrowRight, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const cities = [
  { name: 'Mumbai', emoji: '🌆', state: 'Maharashtra', color: 'from-blue-500/20 to-indigo-500/20' },
  { name: 'Delhi', emoji: '🏛️', state: 'Delhi NCR', color: 'from-orange-500/20 to-red-500/20' },
  { name: 'Bangalore', emoji: '🌿', state: 'Karnataka', color: 'from-green-500/20 to-emerald-500/20' },
  { name: 'Chennai', emoji: '🎭', state: 'Tamil Nadu', color: 'from-yellow-500/20 to-orange-500/20' },
  { name: 'Hyderabad', emoji: '💎', state: 'Telangana', color: 'from-purple-500/20 to-pink-500/20' },
  { name: 'Pune', emoji: '🏫', state: 'Maharashtra', color: 'from-cyan-500/20 to-blue-500/20' },
  { name: 'Kolkata', emoji: '🌺', state: 'West Bengal', color: 'from-pink-500/20 to-rose-500/20' },
  { name: 'Ahmedabad', emoji: '🪁', state: 'Gujarat', color: 'from-amber-500/20 to-yellow-500/20' },
  { name: 'Jaipur', emoji: '🏰', state: 'Rajasthan', color: 'from-rose-500/20 to-orange-500/20' },
  { name: 'Surat', emoji: '💍', state: 'Gujarat', color: 'from-violet-500/20 to-purple-500/20' },
  { name: 'Lucknow', emoji: '🕌', state: 'Uttar Pradesh', color: 'from-teal-500/20 to-green-500/20' },
  { name: 'Kochi', emoji: '🌴', state: 'Kerala', color: 'from-lime-500/20 to-green-500/20' },
];

export default function LocationPicker() {
  const [selected, setSelected] = useState('');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const { updateUser } = useAuth();

  const filtered = cities.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.state.toLowerCase().includes(search.toLowerCase())
  );

  const handleContinue = () => {
    if (!selected) { toast.error('Please select your city'); return; }
    updateUser({ location: selected });
    toast.success(`📍 Location set to ${selected}!`);
    navigate('/name');
  };

  return (
    <div className="min-h-screen bg-gradient-main relative overflow-hidden">
      <div className="blob-1 top-0 left-0 opacity-30" />
      <div className="blob-2 bottom-0 right-0 opacity-30" />

      <div className="max-w-2xl mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-10 animate-slide-up">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-400 rounded-2xl shadow-2xl mb-4">
            <MapPin className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-black text-white mb-3">
            Select Your <span className="gradient-text">City</span>
          </h1>
          <p className="text-gray-400">We'll show you restaurants and stores near you</p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search your city..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input-field pl-12 text-base"
          />
        </div>

        {/* City Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          {filtered.map(city => (
            <button
              key={city.name}
              onClick={() => setSelected(city.name)}
              className={`glass rounded-2xl p-5 text-left transition-all duration-300 bg-gradient-to-br ${city.color} card-hover relative overflow-hidden ${
                selected === city.name
                  ? 'border-orange-500 border-2 shadow-lg shadow-orange-500/20 scale-[1.03]'
                  : 'border border-white/5 hover:border-orange-500/30'
              }`}
            >
              {selected === city.name && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
              )}
              <div className="text-3xl mb-2">{city.emoji}</div>
              <div className="font-bold text-white text-sm">{city.name}</div>
              <div className="text-gray-400 text-xs mt-0.5">{city.state}</div>
            </button>
          ))}
        </div>

        {/* Selected display */}
        {selected && (
          <div className="glass rounded-2xl p-4 mb-6 flex items-center gap-3 border border-orange-500/30 animate-slide-up">
            <MapPin className="w-5 h-5 text-orange-400" />
            <div>
              <p className="text-white font-semibold">{selected}</p>
              <p className="text-gray-400 text-xs">Selected delivery location</p>
            </div>
          </div>
        )}

        <button
          onClick={handleContinue}
          className="btn-primary w-full flex items-center justify-center gap-2 py-4 text-base"
        >
          Continue <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
