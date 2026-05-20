import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import { useProgress } from '../context/ProgressContext';
import PageHeader from '../components/PageHeader';

const Profile = () => {
  const { isDark } = useTheme();
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');

  const { completedCount, totalLessons, progressPercent, categoryProgress } = useProgress();
  const quizScore      = 75;
  const points         = 320;
  const joinDate       = user?.joinedAt ? new Date(user.joinedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Today';

  const badges = [
    { icon: '🏁', label: 'First Lesson',    earned: true  },
    { icon: '🔥', label: '3-Day Streak',    earned: true  },
    { icon: '🧠', label: 'Quiz Master',     earned: false },
    { icon: '💎', label: 'SQL Expert',      earned: false },
    { icon: '⚡', label: 'Speed Learner',   earned: true  },
    { icon: '🏆', label: 'Top Scorer',      earned: false },
  ];

  const handleSave = () => {
    if (!name.trim() || name.trim().length < 2) {
      toast.error('Name must be at least 2 characters');
      return;
    }
    const stored = JSON.parse(localStorage.getItem('sql_study_user') || '{}');
    stored.name = name.trim();
    localStorage.setItem('sql_study_user', JSON.stringify(stored));
    toast.success('Profile updated!');
    setEditing(false);
  };

  return (
    <>
      <Toaster position="top-right" toastOptions={{ style: { background: '#1e1b4b', color: '#e0e7ff', border: '1px solid #4f46e5' } }} />

      <PageHeader
        icon="👤"
        title="Profile"
        subtitle="Manage your account and track learning progress."
        badge={`${progressPercent}%`}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Profile Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className={`lg:col-span-4 section-card border text-center ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}>
          <div className="relative inline-block mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-xl shadow-indigo-500/30 mx-auto">
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-2 border-slate-900 flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full" />
            </div>
          </div>

          {editing ? (
            <div className="space-y-3">
              <input
                type="text" value={name} onChange={e => setName(e.target.value)}
                className={`w-full text-center px-3 py-2 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  isDark ? 'bg-white/10 border-white/20 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}
              />
              <div className="flex gap-2">
                <button onClick={handleSave} className="flex-1 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium rounded-xl">Save</button>
                <button onClick={() => { setEditing(false); setName(user?.name || ''); }} className={`flex-1 py-2 text-sm font-medium rounded-xl border ${isDark ? 'border-white/20 text-slate-300' : 'border-slate-200 text-slate-600'}`}>Cancel</button>
              </div>
            </div>
          ) : (
            <>
              <h3 className={`text-lg font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-800'}`}>{user?.name}</h3>
              <p className={`text-sm mb-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{user?.email}</p>
              <p className={`text-xs mb-4 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Joined {joinDate}</p>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={() => setEditing(true)}
                className={`w-full py-2.5 rounded-xl text-sm font-medium border transition-all ${isDark ? 'border-white/20 text-slate-300 hover:bg-white/10' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                ✏️ Edit Profile
              </motion.button>
            </>
          )}
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className={`lg:col-span-8 section-card border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}>
          <h3 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-800'}`}>📊 Learning Stats</h3>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {[
              { label: 'Lessons Completed', value: `${completedCount}/${totalLessons} (${progressPercent}%)`, icon: '📚', color: 'text-indigo-400' },
              { label: 'Quiz Average',       value: `${quizScore}%`,                    icon: '🧠', color: 'text-purple-400' },
              { label: 'Points Earned',      value: points,                             icon: '🏆', color: 'text-amber-400'  },
              { label: 'Current Streak',     value: '3 days',                           icon: '🔥', color: 'text-red-400'   },
            ].map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 + i * 0.06 }}
                className={`p-4 rounded-xl ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
                <p className="text-xl mb-1">{s.icon}</p>
                <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
                <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{s.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Progress bars */}
          <h4 className={`text-sm font-semibold mb-3 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Topic Progress</h4>
          <div className="space-y-3">
            {[
              { label: 'DDL', progress: categoryProgress('DDL'), color: 'from-indigo-500 to-blue-500' },
              { label: 'DML', progress: categoryProgress('DML'), color: 'from-purple-500 to-pink-500' },
              { label: 'DQL', progress: categoryProgress('DQL'), color: 'from-emerald-500 to-teal-500' },
            ].map(t => (
              <div key={t.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>{t.label}</span>
                  <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>{t.progress}%</span>
                </div>
                <div className={`w-full h-2 rounded-full ${isDark ? 'bg-white/10' : 'bg-slate-100'}`}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${t.progress}%` }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
                    className={`h-2 rounded-full bg-gradient-to-r ${t.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Badges */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className={`section-card border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}>
        <h3 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-800'}`}>🏅 Badges & Achievements</h3>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
          {badges.map((b, i) => (
            <motion.div key={b.label} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.35 + i * 0.06 }}
              whileHover={{ scale: 1.08 }}
              className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${
                b.earned
                  ? isDark ? 'bg-indigo-500/10 border-indigo-500/30' : 'bg-indigo-50 border-indigo-200'
                  : isDark ? 'bg-white/5 border-white/10 opacity-40' : 'bg-slate-50 border-slate-200 opacity-40'
              }`}>
              <span className={`text-2xl ${!b.earned && 'grayscale'}`}>{b.icon}</span>
              <span className={`text-xs font-medium text-center leading-tight ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{b.label}</span>
              {b.earned && <span className="text-xs text-indigo-400 font-semibold">Earned</span>}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default Profile;
