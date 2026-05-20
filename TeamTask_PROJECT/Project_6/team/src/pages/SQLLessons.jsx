import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useProgress } from '../context/ProgressContext';
import { sqlLessonsData, allLessons, lessonStats } from '../data/sqlLessons';
import LessonCard from '../components/LessonCard';
import PageHeader from '../components/PageHeader';

const TABS = ['ALL', 'DDL', 'DML', 'DQL'];
const TAB_META = {
  ALL: { icon: '📖', desc: 'Complete SQL curriculum — every lesson in one place', color: 'from-violet-600 via-purple-600 to-fuchsia-600' },
  DDL: { icon: '🏗️', desc: 'Data Definition Language — CREATE, ALTER, DROP, indexes & constraints', color: 'from-indigo-600 to-blue-600' },
  DML: { icon: '✏️', desc: 'Data Manipulation Language — INSERT, UPDATE, DELETE, MERGE', color: 'from-purple-600 to-pink-600' },
  DQL: { icon: '🔍', desc: 'Data Query Language — SELECT, JOINs, aggregates, CTEs & more', color: 'from-emerald-600 to-teal-600' },
};

const DIFFICULTIES = ['All', 'Beginner', 'Intermediate', 'Advanced'];

const SQLLessons = () => {
  const { isDark } = useTheme();
  const { completedCount, progressPercent } = useProgress();
  const [activeTab, setActiveTab] = useState('ALL');
  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState('All');

  const filtered = useMemo(() => {
    let lessons = activeTab === 'ALL' ? allLessons : (sqlLessonsData[activeTab] || []);
    if (difficulty !== 'All') lessons = lessons.filter(l => l.difficulty === difficulty);
    if (search.trim()) {
      const q = search.toLowerCase();
      lessons = lessons.filter(l =>
        l.title.toLowerCase().includes(q) ||
        l.definition.toLowerCase().includes(q) ||
        l.category.toLowerCase().includes(q) ||
        l.difficulty.toLowerCase().includes(q)
      );
    }
    return lessons;
  }, [activeTab, search, difficulty]);

  const meta = TAB_META[activeTab];

  const progressBadge = (
    <div className={`text-center px-5 py-3 rounded-2xl min-w-[100px] ${isDark ? 'bg-white/10 border border-white/10' : 'bg-white border border-slate-200 shadow-sm'}`}>
      <p className="text-2xl font-bold text-gradient leading-none">{progressPercent}%</p>
      <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{completedCount}/{lessonStats.total}</p>
    </div>
  );

  return (
    <>
      <PageHeader
        icon="📚"
        title="SQL Lessons"
        subtitle={`${lessonStats.total} lessons across DDL, DML, and DQL — search, filter, and mark complete.`}
        action={progressBadge}
      />

      {/* Progress strip */}
      <div className={`section-card border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <span className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Overall completion</span>
          <div className="flex flex-wrap gap-2">
            {Object.entries(lessonStats.byCategory).map(([cat, n]) => (
              <span key={cat} className={`text-xs px-3 py-1 rounded-full font-medium ${isDark ? 'bg-white/10 text-slate-300' : 'bg-slate-100 text-slate-600'}`}>
                {cat}: {n}
              </span>
            ))}
          </div>
        </div>
        <div className={`w-full h-2.5 rounded-full ${isDark ? 'bg-white/10' : 'bg-slate-100'}`}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          />
        </div>
      </div>

      {/* Toolbar */}
      <div className="toolbar-row">
        <div className="relative flex-1 min-w-0">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">🔍</span>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search lessons..."
            className={`w-full h-11 pl-11 pr-10 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-800'
            }`}
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-lg leading-none">×</button>
          )}
        </div>
        <div className={`inline-flex p-1 rounded-xl border shrink-0 ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-100 border-slate-200'}`}>
          {DIFFICULTIES.map(d => (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              className={`px-3 sm:px-4 h-9 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                difficulty === d ? 'bg-indigo-600 text-white shadow-sm' : isDark ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Category tabs */}
      <div className={`tab-grid p-1.5 rounded-2xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-100 border-slate-200'}`}>
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex items-center justify-center gap-1.5 py-3 rounded-xl text-sm font-bold transition-all ${
              activeTab === tab
                ? `bg-gradient-to-r ${TAB_META[tab].color} text-white shadow-md`
                : isDark ? 'text-slate-400 hover:bg-white/10' : 'text-slate-600 hover:bg-white'
            }`}
          >
            <span>{TAB_META[tab].icon}</span>
            <span>{tab}</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeTab === tab ? 'bg-white/25' : isDark ? 'bg-white/10' : 'bg-slate-200'}`}>
              {tab === 'ALL' ? allLessons.length : sqlLessonsData[tab]?.length}
            </span>
          </button>
        ))}
      </div>

      {/* Active category info */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className={`section-card border flex items-center gap-4 ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}
        >
          <span className="text-3xl w-12 text-center shrink-0">{meta.icon}</span>
          <div className="flex-1 min-w-0">
            <p className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{activeTab === 'ALL' ? 'All Lessons' : activeTab}</p>
            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{meta.desc}</p>
          </div>
          <div className="text-right shrink-0 pl-4">
            <p className={`text-2xl font-extrabold tabular-nums ${isDark ? 'text-white' : 'text-slate-900'}`}>{filtered.length}</p>
            <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>showing</p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Lesson list */}
      <section className="flex flex-col gap-4">
        <AnimatePresence mode="wait">
          <motion.div key={`${activeTab}-${search}-${difficulty}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-4">
            {filtered.length > 0 ? (
              filtered.map((lesson, i) => <LessonCard key={lesson.id} lesson={lesson} index={i} />)
            ) : (
              <div className={`section-card border text-center py-16 ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
                <p className="text-5xl mb-3">🔍</p>
                <p className={`font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>No lessons match</p>
                <p className={`text-sm mt-1 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Try another search or filter</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </section>
    </>
  );
};

export default SQLLessons;
