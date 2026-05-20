import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../components/AuthLayout';

const InputField = ({ label, type, value, onChange, placeholder, icon }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-medium text-slate-300">{label}</label>
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg">{icon}</span>
      <input type={type} value={value} onChange={onChange} placeholder={placeholder}
        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 pl-10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all" required />
    </div>
  </div>
);

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const strength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3;
  const strengthColors = ['', 'bg-red-500', 'bg-amber-500', 'bg-emerald-500'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirm) { toast.error('Fill all fields'); return; }
    if (name.trim().length < 2) { toast.error('Name too short'); return; }
    if (!/\S+@\S+\.\S+/.test(email)) { toast.error('Invalid email'); return; }
    if (password.length < 6) { toast.error('Password min 6 characters'); return; }
    if (password !== confirm) { toast.error('Passwords do not match'); return; }
    setLoading(true);
    try {
      await new Promise(r => setTimeout(r, 600));
      register(name.trim(), email, password);
      toast.success('Account created!');
      setTimeout(() => navigate('/dashboard'), 800);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Create account" subtitle="Start learning all 35+ SQL lessons free">
      <Toaster position="top-right" toastOptions={{ style: { background: '#1e1b4b', color: '#e0e7ff', border: '1px solid #6366f1' } }} />
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <InputField label="Full Name" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="John Doe" icon="👤" />
        <InputField label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" icon="📧" />
        <div>
          <InputField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Min 6 characters" icon="🔒" />
          {password.length > 0 && (
            <div className="mt-2 flex gap-1">
              {[1, 2, 3].map(i => (
                <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i <= strength ? strengthColors[strength] : 'bg-white/15'}`} />
              ))}
            </div>
          )}
        </div>
        <InputField label="Confirm Password" type="password" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Repeat password" icon="✅" />
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={loading}
          className="btn-primary w-full py-3.5 disabled:opacity-60">
          {loading ? 'Creating...' : 'Create Account →'}
        </motion.button>
      </form>
      <p className="text-center text-slate-500 text-sm mt-6">
        Have an account? <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">Sign in</Link>
      </p>
    </AuthLayout>
  );
};

export default Register;
