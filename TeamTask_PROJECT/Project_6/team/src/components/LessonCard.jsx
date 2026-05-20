import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useProgress } from '../context/ProgressContext';

const difficultyColor = {
  Beginner: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  Intermediate: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  Advanced: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
};

const categoryColor = {
  DDL: 'from-indigo-500/30 to-blue-500/20 text-indigo-300 border-indigo-500/30',
  DML: 'from-purple-500/30 to-pink-500/20 text-purple-300 border-purple-500/30',
  DQL: 'from-emerald-500/30 to-teal-500/20 text-emerald-300 border-emerald-500/30',
};

const LessonCard = ({ lesson, index }) => {
  const { isDark } = useTheme();
  const { isCompleted, toggleComplete } = useProgress();
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const done = isCompleted(lesson.id);

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(lesson.example);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleComplete = (e) => {
    e.stopPropagation();
    toggleComplete(lesson.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.04, 0.4), duration: 0.35 }}
      whileHover={{ y: -4 }}
      className={`group rounded-2xl border overflow-hidden transition-all duration-300 ${
        done
          ? isDark ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-emerald-300 bg-emerald-50/50'
          : isDark
            ? 'border-white/10 bg-white/[0.04] hover:border-indigo-500/40 hover:bg-white/[0.07] glass-card'
            : 'border-slate-200/80 bg-white hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-500/10'
      }`}
    >
      <div className="section-card cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl flex-shrink-0 bg-gradient-to-br ${
            lesson.category === 'DDL' ? 'from-indigo-500/30 to-blue-600/20' :
            lesson.category === 'DML' ? 'from-purple-500/30 to-pink-600/20' :
            'from-emerald-500/30 to-teal-600/20'
          } ${isDark ? 'border border-white/10' : 'border border-slate-100'}`}>
            {lesson.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border bg-gradient-to-r ${categoryColor[lesson.category]}`}>
                {lesson.category}
              </span>
              <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${difficultyColor[lesson.difficulty]}`}>
                {lesson.difficulty}
              </span>
              {done && <span className="text-xs text-emerald-400 font-semibold">✓ Done</span>}
            </div>
            <h3 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-slate-800'}`}>{lesson.title}</h3>
            <p className={`mt-2 text-sm leading-relaxed line-clamp-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {lesson.definition}
            </p>
          </div>
          <div className="flex flex-col items-center gap-2 flex-shrink-0">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleComplete}
              className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm transition-all ${
                done
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/40'
                  : isDark ? 'bg-white/10 text-slate-400 hover:bg-indigo-500/30 hover:text-white' : 'bg-slate-100 text-slate-500 hover:bg-indigo-100 hover:text-indigo-600'
              }`}
              title={done ? 'Mark incomplete' : 'Mark complete'}
            >
              {done ? '✓' : '○'}
            </motion.button>
            <motion.span animate={{ rotate: expanded ? 180 : 0 }} className={`text-lg ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>⌄</motion.span>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className={`border-t px-5 pb-5 pt-4 space-y-4 ${isDark ? 'border-white/10' : 'border-slate-100'}`}>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2">Syntax</h4>
                <pre className={`text-xs rounded-xl p-4 overflow-x-auto code-font leading-relaxed border ${
                  isDark ? 'bg-slate-900/80 text-emerald-300 border-white/10' : 'bg-slate-900 text-emerald-300 border-slate-800'
                }`}>{lesson.syntax}</pre>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-indigo-400">Example</h4>
                  <motion.button whileTap={{ scale: 0.95 }} onClick={handleCopy}
                    className={`text-xs px-3 py-1 rounded-lg ${copied ? 'bg-emerald-500/20 text-emerald-400' : isDark ? 'bg-white/10 text-slate-300' : 'bg-slate-100 text-slate-600'}`}>
                    {copied ? 'Copied!' : 'Copy'}
                  </motion.button>
                </div>
                <pre className={`text-xs rounded-xl p-4 overflow-x-auto code-font leading-relaxed border ${
                  isDark ? 'bg-slate-900/80 text-sky-300 border-white/10' : 'bg-slate-900 text-sky-300 border-slate-800'
                }`}>{lesson.example}</pre>
              </div>
              <div className={`p-4 rounded-xl border ${isDark ? 'bg-indigo-500/10 border-indigo-500/20' : 'bg-indigo-50 border-indigo-100'}`}>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{lesson.explanation}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LessonCard;
