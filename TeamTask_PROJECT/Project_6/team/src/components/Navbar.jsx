import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Navbar = ({ onMenuToggle }) => {
  const { isDark, toggleTheme } = useTheme();
  const { user } = useAuth();

  return (
    <header
      className={`sticky top-0 z-30 h-16 flex items-center shrink-0 border-b backdrop-blur-xl ${
        isDark ? 'bg-slate-950/80 border-white/10' : 'bg-white/90 border-slate-200'
      }`}
    >
      <div className="w-full h-full flex items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Mobile menu */}
        <button
          onClick={onMenuToggle}
          aria-label="Open menu"
          className={`md:hidden p-2.5 rounded-xl transition-colors shrink-0 ${
            isDark ? 'text-slate-300 hover:bg-white/10' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Mobile logo */}
        <div className="flex items-center gap-2 md:hidden min-w-0">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shrink-0">
            🗄️
          </div>
          <span className={`font-bold truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>SQLMaster</span>
        </div>

        {/* Desktop breadcrumb area */}
        <div className="hidden md:block flex-1 min-w-0">
          <p className={`text-xs font-medium uppercase tracking-wider ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
            Learning Platform
          </p>
          <p className={`text-sm font-semibold truncate ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
            Welcome, {user?.name?.split(' ')[0] || 'Learner'}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3 ml-auto shrink-0">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={`p-2.5 rounded-xl transition-colors ${
              isDark ? 'bg-white/10 text-amber-300' : 'bg-slate-100 text-slate-600'
            }`}
          >
            {isDark ? '☀️' : '🌙'}
          </motion.button>

          <div
            className={`flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl border ${
              isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="hidden sm:block text-left min-w-0">
              <p className={`text-sm font-semibold leading-tight truncate max-w-[120px] ${isDark ? 'text-white' : 'text-slate-800'}`}>
                {user?.name || 'User'}
              </p>
              <p className={`text-[11px] truncate max-w-[140px] ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                {user?.email || ''}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
