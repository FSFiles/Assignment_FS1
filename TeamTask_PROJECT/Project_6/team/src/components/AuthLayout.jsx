import { motion } from 'framer-motion';
import MeshBackground from './MeshBackground';

const KEYWORDS = ['SELECT', 'JOIN', 'CREATE', 'INSERT', 'WHERE', 'GROUP BY', 'INDEX', 'ALTER'];

const AuthLayout = ({ children, title, subtitle }) => (
  <div className="min-h-screen flex relative overflow-hidden">
    <MeshBackground variant="auth" />

    <div className="w-full max-w-[1400px] mx-auto min-h-screen flex flex-col lg:flex-row">
      {/* Hero */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-[55%] flex-col justify-center px-12 xl:px-16 py-12">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-xl"
        >
          <div className="flex items-center gap-3 mb-10">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-2xl shadow-xl shadow-indigo-500/40">
              🗄️
            </div>
            <span className="text-2xl font-bold text-white">
              SQL<span className="text-indigo-400">Master</span>
            </span>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-indigo-200 text-sm font-medium">35+ Interactive SQL Lessons</span>
          </div>

          <h1 className="text-5xl xl:text-[3.25rem] font-extrabold text-white leading-[1.1] mb-5">
            Master SQL{' '}
            <span className="text-gradient block mt-1">Like a Pro</span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed mb-10">
            DDL, DML, DQL — complete curriculum with syntax, examples, practice, and quizzes.
          </p>

          <div className="flex flex-wrap gap-2 mb-12">
            {KEYWORDS.map((kw, i) => (
              <motion.span
                key={kw}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.04 }}
                className="code-font text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-indigo-300"
              >
                {kw}
              </motion.span>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              { n: '35+', l: 'Lessons' },
              { n: '3', l: 'Categories' },
              { n: '100%', l: 'Free' },
            ].map(s => (
              <div key={s.l} className="glass bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                <p className="text-2xl font-bold text-white">{s.n}</p>
                <p className="text-xs text-slate-400 mt-1">{s.l}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center px-5 sm:px-8 py-10 lg:py-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[420px]"
        >
          <div className="text-center mb-8 lg:hidden">
            <div className="inline-flex w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl items-center justify-center text-2xl mb-3 mx-auto shadow-xl shadow-indigo-500/40">
              🗄️
            </div>
            <h1 className="text-2xl font-bold text-white">SQLMaster</h1>
          </div>

          <div className="glass bg-white/[0.07] backdrop-blur-2xl border border-white/15 rounded-3xl p-7 sm:p-8 shadow-2xl shadow-indigo-900/40">
            <h2 className="text-xl font-bold text-white mb-1">{title}</h2>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">{subtitle}</p>
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  </div>
);

export default AuthLayout;
