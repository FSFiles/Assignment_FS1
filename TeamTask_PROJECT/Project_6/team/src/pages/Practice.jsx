import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import PageHeader from '../components/PageHeader';

const CHALLENGES = [
  {
    id: 1, title: 'Basic SELECT', difficulty: 'Beginner', icon: '🟢',
    description: 'Write a query to select all columns from the Students table.',
    hint: 'Use SELECT * FROM to get all columns',
    answer: 'SELECT * FROM Students;',
    expectedOutput: '| student_id | first_name | last_name | email | age |\n|-----------|-----------|----------|-------|-----|\n| 1 | Alice | Johnson | alice@email.com | 22 |'
  },
  {
    id: 2, title: 'Filter with WHERE', difficulty: 'Beginner', icon: '🟢',
    description: 'Get all students whose age is greater than 21, ordered by last name.',
    hint: 'Use WHERE age > 21 and ORDER BY last_name',
    answer: 'SELECT * FROM Students WHERE age > 21 ORDER BY last_name;',
    expectedOutput: '| student_id | first_name | last_name | age |\n|-----------|-----------|----------|-----|\n| 4 | David | Brown | 23 |'
  },
  {
    id: 3, title: 'Count Records', difficulty: 'Intermediate', icon: '🟡',
    description: 'Write a query to count the total number of students in the Students table.',
    hint: 'Use COUNT(*) with an alias',
    answer: 'SELECT COUNT(*) AS total_students FROM Students;',
    expectedOutput: '| total_students |\n|---------------|\n| 4 |'
  },
  {
    id: 4, title: 'GROUP BY Age', difficulty: 'Intermediate', icon: '🟡',
    description: 'Group students by age and show the count for each age group.',
    hint: 'Use GROUP BY age with COUNT(*)',
    answer: 'SELECT age, COUNT(*) AS count FROM Students GROUP BY age ORDER BY age;',
    expectedOutput: '| age | count |\n|-----|-------|\n| 21 | 1 |\n| 22 | 1 |'
  },
  {
    id: 5, title: 'INSERT Record', difficulty: 'Intermediate', icon: '🟡',
    description: "Insert a new student: name 'Eve Wilson', email 'eve@email.com', age 24.",
    hint: 'Use INSERT INTO Students (columns) VALUES (values)',
    answer: "INSERT INTO Students (first_name, last_name, email, age) VALUES ('Eve', 'Wilson', 'eve@email.com', 24);",
    expectedOutput: 'Query OK, 1 row affected'
  },
  {
    id: 6, title: 'JOIN Tables', difficulty: 'Advanced', icon: '🔴',
    description: 'Select student names with their course names using an INNER JOIN.',
    hint: 'Join Students with Enrollments and Courses tables',
    answer: 'SELECT s.first_name, s.last_name, c.course_name FROM Students s INNER JOIN Enrollments e ON s.student_id = e.student_id INNER JOIN Courses c ON e.course_id = c.course_id;',
    expectedOutput: '| first_name | last_name | course_name |\n|-----------|----------|-------------|\n| Alice | Johnson | SQL Basics |'
  },
];

const Practice = () => {
  const { isDark } = useTheme();
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [userQuery, setUserQuery] = useState('');
  const [result, setResult] = useState(null);
  const [showHint, setShowHint] = useState(false);

  const handleRun = () => {
    if (!userQuery.trim()) return;
    const normalized = q => q.replace(/\s+/g, ' ').trim().toLowerCase().replace(/;$/, '');
    const isCorrect = normalized(userQuery) === normalized(selectedChallenge.answer);
    setResult({ correct: isCorrect });
  };

  const handleSelect = (c) => {
    setSelectedChallenge(c);
    setUserQuery('');
    setResult(null);
    setShowHint(false);
  };

  return (
    <>
      <PageHeader
        icon="💻"
        title="SQL Practice"
        subtitle="Hands-on challenges — write queries, run checks, and learn by doing."
        badge={`${CHALLENGES.length} challenges`}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        <aside className="lg:col-span-4 xl:col-span-3 space-y-3 lg:sticky lg:top-24">
          <h3 className={`text-xs font-bold uppercase tracking-widest px-1 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Challenges</h3>
          {CHALLENGES.map((c, i) => (
            <motion.button
              key={c.id}
              initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
              whileHover={{ x: 3 }}
              onClick={() => handleSelect(c)}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                selectedChallenge?.id === c.id
                  ? 'border-indigo-500 bg-indigo-500/10'
                  : isDark ? 'border-white/10 bg-white/5 hover:border-white/20' : 'border-slate-200 bg-white hover:border-indigo-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{c.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className={`font-semibold text-sm truncate ${isDark ? 'text-white' : 'text-slate-800'}`}>{c.title}</p>
                  <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{c.difficulty}</p>
                </div>
                {selectedChallenge?.id === c.id && <div className="w-2 h-2 rounded-full bg-indigo-500 flex-shrink-0" />}
              </div>
            </motion.button>
          ))}
        </aside>

        <div className="lg:col-span-8 xl:col-span-9 min-w-0">
          {selectedChallenge ? (
            <AnimatePresence mode="wait">
              <motion.div key={selectedChallenge.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                {/* Task */}
                <div className={`p-4 rounded-xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{selectedChallenge.icon}</span>
                    <h3 className={`font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>{selectedChallenge.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ml-auto ${
                      selectedChallenge.difficulty === 'Beginner' ? 'bg-emerald-500/20 text-emerald-400' :
                      selectedChallenge.difficulty === 'Intermediate' ? 'bg-amber-500/20 text-amber-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>{selectedChallenge.difficulty}</span>
                  </div>
                  <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{selectedChallenge.description}</p>
                  {showHint && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                      className={`mt-3 p-3 rounded-lg text-sm ${isDark ? 'bg-amber-500/10 border border-amber-500/20 text-amber-300' : 'bg-amber-50 border border-amber-200 text-amber-700'}`}>
                      💡 {selectedChallenge.hint}
                    </motion.div>
                  )}
                </div>

                {/* SQL Editor */}
                <div className={`rounded-xl border overflow-hidden ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
                  <div className={`flex items-center justify-between px-4 py-2 border-b ${isDark ? 'bg-slate-800 border-white/10' : 'bg-slate-100 border-slate-200'}`}>
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>query.sql</span>
                  </div>
                  <textarea
                    value={userQuery}
                    onChange={e => { setUserQuery(e.target.value); setResult(null); }}
                    placeholder="-- Write your SQL query here..."
                    rows={6}
                    className={`w-full p-4 code-font text-sm resize-none focus:outline-none transition-colors ${
                      isDark ? 'bg-slate-800/60 text-emerald-300 placeholder-slate-600' : 'bg-slate-50 text-emerald-800 placeholder-slate-400'
                    }`}
                  />
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-3">
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={handleRun}
                    disabled={!userQuery.trim()}
                    className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/30 hover:from-indigo-500 hover:to-purple-500 transition-all"
                  >
                    ▶ Run Query
                  </motion.button>
                  <button onClick={() => setShowHint(!showHint)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-medium border transition-all ${isDark ? 'border-white/20 text-slate-300 hover:bg-white/10' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                    {showHint ? '🙈 Hide Hint' : '💡 Hint'}
                  </button>
                  <button onClick={() => { setUserQuery(selectedChallenge.answer); setResult(null); }}
                    className={`px-5 py-2.5 rounded-xl text-sm font-medium border transition-all ${isDark ? 'border-white/20 text-slate-300 hover:bg-white/10' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                    👁 Show Answer
                  </button>
                </div>

                {/* Result */}
                <AnimatePresence>
                  {result && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className={`p-4 rounded-xl border ${result.correct
                        ? isDark ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-emerald-50 border-emerald-200 text-emerald-700'
                        : isDark ? 'bg-red-500/10 border-red-500/30 text-red-300' : 'bg-red-50 border-red-200 text-red-700'
                      }`}>
                      <p className="font-semibold text-sm">{result.correct ? '✅ Correct! Great job!' : '❌ Not quite right. Try again!'}</p>
                      {result.correct && (
                        <pre className={`mt-3 text-xs code-font rounded-lg p-3 overflow-x-auto ${isDark ? 'bg-slate-800/60' : 'bg-white'}`}>
                          {selectedChallenge.expectedOutput}
                        </pre>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className={`min-h-[420px] flex flex-col items-center justify-center rounded-2xl border section-card ${isDark ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-slate-50'}`}>
              <p className="text-5xl mb-3">💻</p>
              <p className={`font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Select a challenge</p>
              <p className={`text-sm ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Pick a challenge from the left to start practicing</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Practice;
