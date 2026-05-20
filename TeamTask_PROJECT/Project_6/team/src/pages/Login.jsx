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
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 pl-10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all"
        required
      />
    </div>
  </div>
);

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) { toast.error('Please fill in all fields'); return; }
    if (!/\S+@\S+\.\S+/.test(email)) { toast.error('Please enter a valid email'); return; }
    setLoading(true);
    try {
      await new Promise(r => setTimeout(r, 500));
      login(email, password);
      toast.success('Welcome back!');
      setTimeout(() => navigate('/dashboard'), 700);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    const users = JSON.parse(localStorage.getItem('sql_study_users') || '[]');
    if (!users.length) { toast.error('Register first!'); return; }
    setEmail(users[0].email);
    setPassword(users[0].password);
    toast.success('Demo credentials filled');
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to continue your SQL journey">
      <Toaster position="top-right" toastOptions={{ style: { background: '#1e1b4b', color: '#e0e7ff', border: '1px solid #6366f1' } }} />
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <InputField label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" icon="📧" />
        <InputField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Your password" icon="🔒" />
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={loading}
          className="btn-primary w-full py-3.5 flex items-center justify-center gap-2 disabled:opacity-60">
          {loading ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Signing in...</> : 'Sign In →'}
        </motion.button>
      </form>
      <button onClick={handleDemoLogin} className="w-full mt-3 py-2.5 rounded-xl border border-white/15 text-slate-400 text-sm hover:text-white hover:border-white/30 transition-all">
        Fill demo credentials
      </button>
      <p className="text-center text-slate-500 text-sm mt-6">
        No account? <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-medium">Create one</Link>
      </p>
    </AuthLayout>
  );
};

export default Login;
