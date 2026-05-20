import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import LogoutModal from './LogoutModal';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
  { id: 'lessons', label: 'SQL Lessons', icon: '📚' },
  { id: 'practice', label: 'Practice', icon: '💻' },
  { id: 'quiz', label: 'Quiz', icon: '🧠' },
  { id: 'profile', label: 'Profile', icon: '👤' },
];

const SidebarPanel = ({ activePage, onPageChange, onClose, isDark }) => {
  const { user } = useAuth();
  const { progressPercent, completedCount, totalLessons } = useProgress();
  const [showLogout, setShowLogout] = useState(false);

  const handleNav = (id) => {
    onPageChange(id);
    onClose?.();
  };

  return (
    <div className={`flex flex-col h-full w-[280px] ${isDark ? 'bg-slate-900/95 border-white/10' : 'bg-white border-slate-200'} border-r`}>
      {/* Brand */}
      <div className={`h-16 flex items-center gap-3 px-6 border-b shrink-0 ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
        <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-lg shadow-lg shadow-indigo-500/30">
          🗄️
        </div>
        <span className={`font-bold text-lg ${isDark ? 'text-white' : 'text-slate-900'}`}>
          SQL<span className="text-indigo-500">Master</span>
        </span>
      </div>

      {/* User */}
      <div className={`px-5 py-5 border-b ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold shadow-md shrink-0">
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </div>
          <div className="min-w-0 flex-1">
            <p className={`font-semibold text-sm truncate ${isDark ? 'text-white' : 'text-slate-800'}`}>{user?.name || 'User'}</p>
            <p className={`text-xs truncate ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>{user?.email || ''}</p>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <span className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Progress</span>
            <span className="text-xs font-bold text-indigo-500">{progressPercent}%</span>
          </div>
          <div className={`w-full h-2 rounded-full ${isDark ? 'bg-white/10' : 'bg-slate-100'}`}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
            />
          </div>
          <p className={`text-[11px] mt-1.5 text-right ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
            {completedCount} / {totalLessons} lessons
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNav(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activePage === item.id
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
                : isDark
                  ? 'text-slate-400 hover:text-white hover:bg-white/8'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <span className="w-6 text-center text-base">{item.icon}</span>
            <span className="flex-1 text-left">{item.label}</span>
            {activePage === item.id && <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div className={`px-3 py-4 border-t shrink-0 ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
        <button
          onClick={() => setShowLogout(true)}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
            isDark ? 'text-red-400 hover:bg-red-500/10' : 'text-red-600 hover:bg-red-50'
          }`}
        >
          <span className="w-6 text-center">🚪</span>
          <span>Logout</span>
        </button>
      </div>

      <LogoutModal isOpen={showLogout} onClose={() => setShowLogout(false)} />
    </div>
  );
};

const Sidebar = ({ activePage, onPageChange, isOpen, onClose, variant = 'desktop' }) => {
  const { isDark } = useTheme();

  if (variant === 'desktop') {
    return <SidebarPanel activePage={activePage} onPageChange={onPageChange} isDark={isDark} />;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-50 md:hidden"
          />
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed top-0 left-0 h-full z-50 md:hidden shadow-2xl"
          >
            <SidebarPanel activePage={activePage} onPageChange={onPageChange} onClose={onClose} isDark={isDark} />
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
