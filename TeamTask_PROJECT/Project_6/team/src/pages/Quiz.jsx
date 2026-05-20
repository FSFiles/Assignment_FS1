import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import PageHeader from '../components/PageHeader';

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: 'Which SQL command is used to create a new table?',
    options: ['INSERT TABLE', 'CREATE TABLE', 'MAKE TABLE', 'NEW TABLE'],
    correct: 1,
    explanation: 'CREATE TABLE is the DDL command used to create a new table in a database.',
    category: 'DDL',
  },
  {
    id: 2,
    question: 'Which clause is used to filter rows in a SELECT query?',
    options: ['FILTER', 'HAVING', 'WHERE', 'LIMIT'],
    correct: 2,
    explanation: 'WHERE is used to filter individual rows, while HAVING filters grouped rows.',
    category: 'DQL',
  },
  {
    id: 3,
    question: 'What does DML stand for?',
    options: ['Data Modeling Language', 'Data Manipulation Language', 'Dynamic Markup Language', 'Database Management Layer'],
    correct: 1,
    explanation: 'DML = Data Manipulation Language. It includes INSERT, UPDATE, DELETE.',
    category: 'General',
  },
  {
    id: 4,
    question: 'Which command permanently deletes a table from the database?',
    options: ['DELETE TABLE', 'REMOVE TABLE', 'DROP TABLE', 'ERASE TABLE'],
    correct: 2,
    explanation: 'DROP TABLE permanently removes the table structure and all its data.',
    category: 'DDL',
  },
  {
    id: 5,
    question: 'Which JOIN returns only rows that have matching values in both tables?',
    options: ['LEFT JOIN', 'FULL OUTER JOIN', 'RIGHT JOIN', 'INNER JOIN'],
    correct: 3,
    explanation: 'INNER JOIN returns only the rows where there is a match in both tables.',
    category: 'DQL',
  },
  {
    id: 6,
    question: 'What is the correct syntax to insert data into a table?',
    options: [
      'INSERT table_name VALUES (val1, val2)',
      'ADD INTO table_name (col1) VALUES (val1)',
      'INSERT INTO table_name (col1) VALUES (val1)',
      'PUT INTO table_name VALUES (val1)',
    ],
    correct: 2,
    explanation: 'The correct syntax is INSERT INTO table_name (columns) VALUES (values).',
    category: 'DML',
  },
  {
    id: 7,
    question: 'Which aggregate function returns the number of rows?',
    options: ['SUM()', 'AVG()', 'COUNT()', 'MAX()'],
    correct: 2,
    explanation: 'COUNT() returns the number of rows matching the criteria.',
    category: 'DQL',
  },
  {
    id: 8,
    question: 'Which keyword is used to avoid duplicate rows in a SELECT result?',
    options: ['UNIQUE', 'DISTINCT', 'DIFFERENT', 'NO DUPLICATE'],
    correct: 1,
    explanation: 'SELECT DISTINCT removes duplicate rows from the query result.',
    category: 'DQL',
  },
];

const Quiz = () => {
  const { isDark } = useTheme();
  const [started, setStarted]   = useState(false);
  const [current, setCurrent]   = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers]   = useState([]);
  const [finished, setFinished] = useState(false);

  const q = QUIZ_QUESTIONS[current];
  const score = answers.filter(a => a.correct).length;

  const handleSelect = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
  };

  const handleNext = () => {
    const isCorrect = selected === q.correct;
    const newAnswers = [...answers, { questionId: q.id, selected, correct: isCorrect }];
    setAnswers(newAnswers);

    if (current + 1 >= QUIZ_QUESTIONS.length) {
      setFinished(true);
    } else {
      setCurrent(current + 1);
      setSelected(null);
    }
  };

  const handleRestart = () => {
    setStarted(false); setCurrent(0); setSelected(null); setAnswers([]); setFinished(false);
  };

  const pct = Math.round((score / QUIZ_QUESTIONS.length) * 100);

  if (!started) {
    return (
      <>
        <PageHeader icon="🧠" title="SQL Quiz" subtitle="Test your knowledge across DDL, DML, and DQL." badge={`${QUIZ_QUESTIONS.length} questions`} />
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
          className={`section-card border max-w-2xl mx-auto w-full text-center ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}>
          <div className="text-6xl mb-4">🧠</div>
          <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-800'}`}>SQL Knowledge Quiz</h3>
          <p className={`text-sm mb-6 max-w-md mx-auto ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            {QUIZ_QUESTIONS.length} questions covering DDL, DML, and DQL concepts. Test how much you've learned!
          </p>
          <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto mb-8">
            {[
              { label: 'Questions', value: QUIZ_QUESTIONS.length, icon: '❓' },
              { label: 'Topics', value: '3', icon: '📚' },
              { label: 'Time', value: '~5 min', icon: '⏱️' },
            ].map(s => (
              <div key={s.label} className={`p-3 rounded-xl ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
                <p className="text-xl mb-1">{s.icon}</p>
                <p className={`font-bold text-lg ${isDark ? 'text-white' : 'text-slate-800'}`}>{s.value}</p>
                <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{s.label}</p>
              </div>
            ))}
          </div>
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => setStarted(true)}
            className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/30 hover:from-indigo-500 hover:to-purple-500 transition-all">
            🚀 Start Quiz
          </motion.button>
        </motion.div>
      </>
    );
  }

  if (finished) {
    return (
      <>
        <PageHeader icon="🧠" title="Quiz Results" subtitle="Review your score and retake anytime." />
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
          className={`section-card border max-w-2xl mx-auto w-full text-center ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}>
          <div className="text-6xl mb-4">{pct >= 80 ? '🏆' : pct >= 50 ? '👍' : '📖'}</div>
          <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-800'}`}>
            {pct >= 80 ? 'Excellent!' : pct >= 50 ? 'Good Job!' : 'Keep Practicing!'}
          </h3>
          <p className={`text-sm mb-6 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            You scored <strong className="text-indigo-400">{score}</strong> out of <strong>{QUIZ_QUESTIONS.length}</strong> questions
          </p>
          <div className="relative w-32 h-32 mx-auto mb-6">
            <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="50" fill="none" stroke={isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0'} strokeWidth="10" />
              <motion.circle cx="60" cy="60" r="50" fill="none" stroke="url(#grad)" strokeWidth="10"
                strokeLinecap="round" strokeDasharray={314}
                initial={{ strokeDashoffset: 314 }}
                animate={{ strokeDashoffset: 314 - (314 * pct / 100) }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
              />
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>{pct}%</span>
            </div>
          </div>
          <div className="space-y-2 mb-6 text-left max-w-sm mx-auto">
            {QUIZ_QUESTIONS.map((qq, i) => {
              const ans = answers[i];
              return (
                <div key={qq.id} className={`flex items-center gap-3 p-3 rounded-xl text-sm ${
                  ans?.correct
                    ? isDark ? 'bg-emerald-500/10 text-emerald-300' : 'bg-emerald-50 text-emerald-700'
                    : isDark ? 'bg-red-500/10 text-red-300' : 'bg-red-50 text-red-700'
                }`}>
                  <span>{ans?.correct ? '✅' : '❌'}</span>
                  <span className="truncate">{qq.question}</span>
                </div>
              );
            })}
          </div>
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={handleRestart}
            className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/30">
            🔄 Retake Quiz
          </motion.button>
        </motion.div>
      </>
    );
  }

  return (
    <>
      <PageHeader
        icon="🧠"
        title="SQL Quiz"
        subtitle={`Question ${current + 1} of ${QUIZ_QUESTIONS.length}`}
        badge={q.category}
      />

      {/* Progress */}
      <div className={`w-full h-2 rounded-full ${isDark ? 'bg-white/10' : 'bg-slate-100'}`}>
        <motion.div
          animate={{ width: `${((current) / QUIZ_QUESTIONS.length) * 100}%` }}
          className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={current} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
          className={`section-card border max-w-3xl mx-auto w-full ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}>
          <h3 className={`text-lg font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-800'}`}>{q.question}</h3>
          <div className="space-y-3">
            {q.options.map((opt, idx) => {
              let style = isDark ? 'border-white/10 hover:border-indigo-500/50 hover:bg-white/10 text-slate-300' : 'border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 text-slate-700';
              if (selected !== null) {
                if (idx === q.correct) style = isDark ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300' : 'border-emerald-400 bg-emerald-50 text-emerald-700';
                else if (idx === selected && selected !== q.correct) style = isDark ? 'border-red-500 bg-red-500/10 text-red-300' : 'border-red-400 bg-red-50 text-red-700';
                else style = isDark ? 'border-white/10 text-slate-500' : 'border-slate-200 text-slate-400';
              }
              return (
                <motion.button key={idx} whileHover={selected === null ? { x: 4 } : {}}
                  onClick={() => handleSelect(idx)}
                  disabled={selected !== null}
                  className={`w-full text-left px-4 py-3.5 rounded-xl border text-sm font-medium transition-all duration-200 ${style}`}>
                  <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full border text-xs mr-3 font-bold ${
                    selected === null ? isDark ? 'border-white/20' : 'border-slate-300' : ''
                  }`}>{String.fromCharCode(65 + idx)}</span>
                  {opt}
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence>
            {selected !== null && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                className={`mt-4 p-4 rounded-xl border text-sm ${
                  selected === q.correct
                    ? isDark ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-emerald-50 border-emerald-200 text-emerald-700'
                    : isDark ? 'bg-red-500/10 border-red-500/30 text-red-300' : 'bg-red-50 border-red-200 text-red-700'
                }`}>
                <p className="font-semibold mb-1">{selected === q.correct ? '✅ Correct!' : '❌ Incorrect'}</p>
                <p>{q.explanation}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {selected !== null && (
            <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={handleNext}
              className="mt-4 w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/30 hover:from-indigo-500 hover:to-purple-500 transition-all">
              {current + 1 >= QUIZ_QUESTIONS.length ? '🏁 Finish Quiz' : 'Next Question →'}
            </motion.button>
          )}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default Quiz;
