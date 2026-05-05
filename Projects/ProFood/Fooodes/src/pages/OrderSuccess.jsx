import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Home } from 'lucide-react';

// Confetti colors
const COLORS = ['#ff6b35', '#ffd166', '#06d6a0', '#118ab2', '#ef476f', '#ffffff'];

function Confetti() {
  const pieces = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    color: COLORS[i % COLORS.length],
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 2}s`,
    duration: `${2 + Math.random() * 2}s`,
    size: `${6 + Math.random() * 10}px`,
    shape: Math.random() > 0.5 ? 'circle' : 'square',
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
      {pieces.map(p => (
        <div
          key={p.id}
          className="absolute confetti-piece"
          style={{
            left: p.left,
            top: '-20px',
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: p.shape === 'circle' ? '50%' : '2px',
            animationDuration: p.duration,
            animationDelay: p.delay,
            animationFillMode: 'forwards',
          }}
        />
      ))}
    </div>
  );
}

export default function OrderSuccess() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState('show');   // 'show' | 'fly' | 'done'
  const [showConfetti, setShowConfetti] = useState(false);
  const tickRef = useRef(null);
  const profileIconRef = useRef(null);

  useEffect(() => {
    // Show confetti immediately
    setShowConfetti(true);

    // After 2.5s start tick fly animation
    const flyTimer = setTimeout(() => setPhase('fly'), 2800);

    // After fly completes navigate to profile
    const navTimer = setTimeout(() => {
      setPhase('done');
      navigate('/profile');
    }, 4200);

    return () => { clearTimeout(flyTimer); clearTimeout(navTimer); };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Blobs */}
      <div className="blob-1 top-0 left-0 opacity-30" />
      <div className="blob-2 bottom-0 right-0 opacity-30" />

      {/* Confetti */}
      {showConfetti && <Confetti />}

      {/* Profile icon anchor in top-right (same as navbar) */}
      <div
        id="profile-icon-target"
        className="fixed top-4 right-6 w-9 h-9 bg-gradient-to-br from-orange-500 to-yellow-400 rounded-full z-50 flex items-center justify-center"
      >
        <User className="w-4 h-4 text-white" />
      </div>

      {/* Main Content */}
      <div className="relative z-30 flex flex-col items-center text-center max-w-md">

        {/* Tick Circle */}
        <div
          ref={tickRef}
          className={`relative transition-all duration-700 ${
            phase === 'show' ? 'animate-bounce-in' : ''
          }`}
          style={
            phase === 'fly'
              ? {
                  animation: 'tick-fly 1.4s cubic-bezier(0.55, 0.06, 0.68, 0.19) forwards',
                }
              : {}
          }
        >
          {/* Outer glow ring */}
          <div className="absolute -inset-6 rounded-full bg-green-500/10 animate-ping" style={{ animationDuration: '1.5s' }} />
          <div className="absolute -inset-3 rounded-full bg-green-500/20" />

          {/* Main tick circle */}
          <div className="w-40 h-40 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-2xl shadow-green-500/40 relative">
            {/* Tick SVG */}
            <svg viewBox="0 0 80 80" className="w-20 h-20" fill="none">
              <polyline
                points="15,42 32,60 65,24"
                stroke="white"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="80"
                strokeDashoffset="0"
                style={{
                  animation: 'none',
                  opacity: 1,
                }}
              />
            </svg>
          </div>
        </div>

        {/* Text - hide during fly */}
        {phase === 'show' && (
          <div className="mt-10 animate-slide-up">
            <h1 className="text-4xl font-black text-white mb-3">
              Order <span className="gradient-text">Confirmed!</span> 🎉
            </h1>
            <p className="text-gray-300 text-lg mb-2">
              Your order has been placed successfully.
            </p>
            <p className="text-gray-400 text-sm mb-8">
              Estimated delivery: <span className="text-orange-400 font-bold">30–45 minutes</span>
            </p>

            {/* Order ID */}
            <div className="glass rounded-2xl p-5 mb-8 inline-block">
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Order ID</p>
              <p className="text-white font-mono font-bold text-lg">#{Date.now().toString().slice(-8)}</p>
              <p className="text-gray-500 text-xs mt-1">Keep this for your reference</p>
            </div>

            {/* Steps */}
            <div className="grid grid-cols-4 gap-3 mb-8 w-full">
              {[
                { icon: '✅', label: 'Confirmed' },
                { icon: '👨‍🍳', label: 'Preparing' },
                { icon: '🛵', label: 'On the way' },
                { icon: '🏠', label: 'Delivered' },
              ].map((step, i) => (
                <div key={step.label} className="flex flex-col items-center gap-2">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all ${
                    i === 0 ? 'bg-green-500/20 border border-green-500/50' : 'glass-light opacity-50'
                  }`}>
                    {step.icon}
                  </div>
                  <span className={`text-xs font-medium ${i === 0 ? 'text-green-400' : 'text-gray-500'}`}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-gray-400 text-sm mb-6 animate-pulse">
              ✨ Your badge is flying to your Profile...
            </p>

            <div className="flex gap-3 justify-center flex-wrap">
              <button
                onClick={() => navigate('/profile')}
                className="btn-primary flex items-center gap-2 py-3 px-6"
              >
                <User className="w-4 h-4" /> Go to Profile
              </button>
              <button
                onClick={() => navigate('/food')}
                className="btn-secondary flex items-center gap-2 py-3 px-6"
              >
                <Home className="w-4 h-4" /> Order More
              </button>
            </div>
          </div>
        )}

        {phase === 'fly' && (
          <div className="mt-10">
            <p className="text-white text-xl font-bold animate-fade-in">
              🚀 Taking you to your Profile...
            </p>
          </div>
        )}
      </div>

      {/* Radial glow behind tick */}
      <div className="fixed inset-0 pointer-events-none z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(6,214,160,0.12) 0%, transparent 70%)' }} />
      </div>
    </div>
  );
}
