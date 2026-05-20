import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const PageHeader = ({ icon, title, subtitle, action, badge }) => {
  const { isDark } = useTheme();

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 pb-2 border-b border-transparent sm:border-b-0"
    >
      <div className="min-w-0">
        <div className="flex items-center gap-3 mb-1">
          {icon && <span className="text-2xl flex-shrink-0 leading-none">{icon}</span>}
          <h1 className={`text-2xl sm:text-3xl font-bold tracking-tight truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {title}
          </h1>
          {badge && (
            <span className={`flex-shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full ${isDark ? 'bg-indigo-500/20 text-indigo-300' : 'bg-indigo-100 text-indigo-700'}`}>
              {badge}
            </span>
          )}
        </div>
        {subtitle && (
          <p className={`text-sm sm:text-base max-w-2xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {subtitle}
          </p>
        )}
      </div>
      {action && <div className="flex-shrink-0 w-full sm:w-auto">{action}</div>}
    </motion.header>
  );
};

export default PageHeader;
