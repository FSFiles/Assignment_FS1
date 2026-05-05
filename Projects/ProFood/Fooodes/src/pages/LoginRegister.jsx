import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Phone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginRegister() {
  const [tab, setTab] = useState('login');
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ email: '', password: '', confirmPassword: '' });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Store partial user and proceed to phone OTP
    login({ email: form.email, isVerified: false });
    navigate('/phone-otp');
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center px-4 relative overflow-hidden">
      {/* Blobs */}
      <div className="blob-1 -top-32 -left-32 opacity-50" />
      <div className="blob-2 bottom-0 right-0 opacity-60" />

      <div className="w-full max-w-md animate-slide-up relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-400 rounded-2xl shadow-2xl mb-4 animate-float">
            <span className="text-3xl">🍽️</span>
          </div>
          <h1 className="text-3xl font-black gradient-text">ProFood</h1>
          <p className="text-gray-400 text-sm mt-1">Fresh food. Fast delivery.</p>
        </div>

        {/* Card */}
        <div className="glass rounded-3xl p-8 shadow-2xl">
          {/* Tabs */}
          <div className="flex bg-white/5 rounded-2xl p-1 mb-8">
            {['login', 'register'].map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                  tab === t
                    ? 'bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {t === 'login' ? '🔐 Login' : '✨ Register'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="text-gray-400 text-xs font-semibold mb-2 block uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  className="input-field pl-11"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-gray-400 text-xs font-semibold mb-2 block uppercase tracking-wider">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={form.password}
                  onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                  className="input-field pl-11 pr-11"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-orange-400 transition-colors">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password (register only) */}
            {tab === 'register' && (
              <div className="animate-slide-up">
                <label className="text-gray-400 text-xs font-semibold mb-2 block uppercase tracking-wider">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type={showPass ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={form.confirmPassword}
                    onChange={e => setForm(p => ({ ...p, confirmPassword: e.target.value }))}
                    className="input-field pl-11"
                  />
                </div>
              </div>
            )}

            {tab === 'login' && (
              <div className="flex justify-end">
                <button type="button" className="text-orange-400 text-sm hover:text-orange-300 transition-colors">Forgot password?</button>
              </div>
            )}

            <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 text-base mt-2">
              {tab === 'login' ? 'Login' : 'Create Account'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-gray-500 text-sm">or continue with</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Phone OTP shortcut */}
          <button
            onClick={() => navigate('/phone-otp')}
            className="w-full flex items-center justify-center gap-3 py-3 glass-light rounded-2xl border border-orange-500/20 text-gray-300 hover:text-white hover:border-orange-500/40 transition-all font-semibold"
          >
            <Phone className="w-5 h-5 text-orange-400" />
            Continue with Phone (OTP)
          </button>

          <p className="text-center text-gray-500 text-sm mt-6">
            {tab === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => setTab(tab === 'login' ? 'register' : 'login')} className="text-orange-400 hover:text-orange-300 font-semibold transition-colors">
              {tab === 'login' ? 'Register' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
