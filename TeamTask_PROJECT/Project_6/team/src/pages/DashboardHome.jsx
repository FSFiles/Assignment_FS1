import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { lessonStats } from '../data/sqlLessons';
import { useProgress } from '../context/ProgressContext';
import PageHeader from '../components/PageHeader';

const StatCard = ({ icon, label, value, color, delay }) => {
  const { isDark } = useTheme();
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35 }}
      className={`section-card border h-full flex flex-col ${
        isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-sm'
      }`}
    >
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-4 ${color}`}>{icon}</div>
      <p className={`text-2xl font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>{value}</p>
      <p className={`text-sm mt-auto ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{label}</p>
    </motion.div>
  );
};

const DashboardHome = ({ onNavigate }) => {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const { completedCount, progressPercent } = useProgress();

  const stats = [
    { icon: '📚', label: 'Total Lessons', value: lessonStats.total, color: 'bg-indigo-500/20 text-indigo-400', delay: 0.05 },
    { icon: '✅', label: 'Completed', value: completedCount, color: 'bg-emerald-500/20 text-emerald-400', delay: 0.1 },
    { icon: '🧠', label: 'Quizzes Taken', value: 3, color: 'bg-purple-500/20 text-purple-400', delay: 0.15 },
    { icon: '🏆', label: 'Points Earned', value: 320, color: 'bg-amber-500/20 text-amber-400', delay: 0.2 },
  ];

  const quickTopics = [
    { label: 'All Lessons', icon: '📖', color: 'from-violet-600 to-fuchsia-600', page: 'lessons' },
    { label: 'DDL', icon: '🏗️', color: 'from-indigo-600 to-blue-600', page: 'lessons' },
    { label: 'DML', icon: '✏️', color: 'from-purple-600 to-pink-600', page: 'lessons' },
    { label: 'DQL', icon: '🔍', color: 'from-emerald-600 to-teal-600', page: 'lessons' },
  ];

  return (
    <>
      <PageHeader
        icon="🏠"
        title="Dashboard"
        subtitle={`Welcome back, ${user?.name || 'Learner'} — track your progress and jump into lessons.`}
        badge={`${progressPercent}%`}
      />

      {/* Hero banner */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6 md:p-8"
      >
        <div className="absolute inset-0 opacity-25" style={{ backgroundImage: 'radial-gradient(circle at 85% 40%, white 0%, transparent 55%)' }} />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="min-w-0">
            <p className="text-indigo-200 text-sm font-medium mb-2">Your learning journey</p>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{user?.name || 'Learner'}</h2>
            <p className="text-indigo-200/90 text-sm max-w-md">Continue where you left off and complete all 35 SQL lessons.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 lg:min-w-[280px]">
            <div className="flex-1">
              <div className="flex justify-between text-xs text-indigo-200 mb-2">
                <span>Progress</span>
                <span className="font-semibold">{progressPercent}%</span>
              </div>
              <div className="w-full h-2.5 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  className="h-full bg-white rounded-full"
                />
              </div>
              <p className="text-xs text-indigo-200/80 mt-2 text-right">{completedCount} / {lessonStats.total} lessons</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onNavigate('lessons')}
              className="shrink-0 bg-white text-indigo-700 text-sm font-semibold px-6 py-3 rounded-xl hover:bg-indigo-50 transition-colors text-center"
            >
              Continue →
            </motion.button>
          </div>
        </div>
      </motion.div>

      <div className="stat-grid">
        {stats.map(s => <StatCard key={s.label} {...s} />)}
      </div>

      <section>
        <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>Quick access</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickTopics.map((t, i) => (
            <motion.button
              key={t.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.05 }}
              whileHover={{ y: -3 }}
              onClick={() => onNavigate(t.page)}
              className={`bg-gradient-to-br ${t.color} p-5 rounded-2xl text-white text-left shadow-lg min-h-[100px] flex flex-col justify-between`}
            >
              <span className="text-2xl">{t.icon}</span>
              <span className="text-sm font-semibold">{t.label}</span>
            </motion.button>
          ))}
        </div>
      </section>

      <section>
        <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>Recent activity</h3>
        <div className={`rounded-2xl border overflow-hidden ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}>
          {[
            { action: 'Completed "CREATE TABLE" lesson', time: '2 hours ago', icon: '✅' },
            { action: 'Scored 90% on DDL Quiz', time: '1 day ago', icon: '🏆' },
            { action: 'Practiced INSERT queries', time: '2 days ago', icon: '💻' },
            { action: 'Studied SELECT with JOINs', time: '3 days ago', icon: '📚' },
          ].map((item, i) => (
            <div
              key={i}
              className={`flex items-center gap-4 px-5 py-4 ${
                i > 0 ? isDark ? 'border-t border-white/10' : 'border-t border-slate-100' : ''
              }`}
            >
              <span className="w-8 text-center text-lg shrink-0">{item.icon}</span>
              <p className={`flex-1 text-sm font-medium min-w-0 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>{item.action}</p>
              <span className={`text-xs shrink-0 tabular-nums ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{item.time}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default DashboardHome;
