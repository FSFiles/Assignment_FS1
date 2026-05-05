import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Smile } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const suggestions = ['Rahul', 'Priya', 'Arjun', 'Sneha', 'Vikram', 'Ananya'];

export default function NameEntry() {
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const { updateUser } = useAuth();

  const handleContinue = () => {
    if (!name.trim()) { toast.error('Please enter your name'); return; }
    updateUser({ name: name.trim() });
    toast.success(`Welcome, ${name.trim()}! 🎉`);
    navigate('/food');
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center px-4 relative overflow-hidden">
      <div className="blob-1 -top-32 -right-32 opacity-40" />
      <div className="blob-2 bottom-0 -left-20 opacity-40" />

      <div className="w-full max-w-md animate-slide-up relative z-10">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-yellow-400 rounded-3xl shadow-2xl mb-4 animate-float">
            <Smile className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-black text-white mb-2">
            What should we <span className="gradient-text">call you?</span>
          </h1>
          <p className="text-gray-400">We'd love to personalize your experience</p>
        </div>

        <div className="glass rounded-3xl p-8 shadow-2xl">
          <div className="space-y-6">
            <div>
              <label className="text-gray-400 text-xs font-semibold mb-2 block uppercase tracking-wider">Your Name</label>
              <input
                type="text"
                autoFocus
                placeholder="e.g. Rahul"
                value={name}
                onChange={e => setName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleContinue()}
                className="input-field text-lg font-semibold"
                maxLength={30}
              />
            </div>

            {/* Quick suggestions */}
            <div>
              <p className="text-gray-500 text-xs mb-3">Quick suggestions</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map(s => (
                  <button
                    key={s}
                    onClick={() => setName(s)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                      name === s
                        ? 'bg-orange-500 text-white'
                        : 'glass-light text-gray-300 hover:text-white hover:border-orange-500/30'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {name.trim() && (
              <div className="glass-light rounded-2xl p-4 text-center animate-slide-up">
                <p className="text-gray-400 text-sm">
                  Hello, <span className="text-orange-400 font-black text-lg">{name.trim()}</span>! 👋
                </p>
                <p className="text-gray-500 text-xs mt-1">Ready to discover amazing food?</p>
              </div>
            )}

            <button
              onClick={handleContinue}
              disabled={!name.trim()}
              className="btn-primary w-full flex items-center justify-center gap-2 py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Let's Explore Food! <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
