import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import PostCard from '../components/PostCard'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -20, transition: { duration: 0.3 } },
}

const containerVariants = {
  animate: { transition: { staggerChildren: 0.1 } },
}

export default function Home() {
  const { user, posts } = useAuth()
  const navigate         = useNavigate()
  const [filter, setFilter] = useState('latest')

  const sorted = [...posts].sort((a, b) => {
    if (filter === 'popular') return b.likes.length - a.likes.length
    return new Date(b.createdAt) - new Date(a.createdAt)
  })

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative z-10 min-h-screen pt-24 pb-20 px-4"
    >
      <div className="max-w-6xl mx-auto">

        {/* ── Hero Banner ───────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <motion.p
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-5"
            style={{
              background: 'rgba(168,85,247,0.1)',
              border: '1px solid rgba(168,85,247,0.3)',
              color: '#c4b5fd',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse inline-block" />
            Live · Zero Gravity Feed
          </motion.p>

          <h1
            className="font-display font-black text-4xl sm:text-5xl lg:text-6xl mb-4 leading-tight"
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #a855f7 40%, #3b82f6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Welcome back,<br />
            <span style={{ color: '#a855f7', WebkitTextFillColor: '#a855f7',
              textShadow: '0 0 30px rgba(168,85,247,0.5)' }}>
              @{user}
            </span>
          </h1>

          <p className="text-slate-500 text-base max-w-xl mx-auto">
            Ideas float freely here — unbound by gravity, unshackled by convention.
          </p>
        </motion.div>

        {/* ── Controls Row ──────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          {/* Stats */}
          <div className="flex items-center gap-4">
            {[
              { label: 'Posts',  value: posts.length, icon: '📝' },
              { label: 'Likes',  value: posts.reduce((s, p) => s + p.likes.length, 0), icon: '❤️' },
            ].map(({ label, value, icon }) => (
              <div key={label}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <span>{icon}</span>
                <span className="font-bold text-white">{value}</span>
                <span className="text-slate-500">{label}</span>
              </div>
            ))}
          </div>

          {/* Sort toggle */}
          <div className="flex items-center gap-1 p-1 rounded-xl"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            {['latest', 'popular'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-all duration-300"
                style={{
                  background: filter === f ? 'linear-gradient(135deg,#7c3aed,#3b82f6)' : 'transparent',
                  color: filter === f ? 'white' : 'rgba(226,232,240,0.5)',
                  boxShadow: filter === f ? '0 0 15px rgba(124,58,237,0.3)' : 'none',
                }}
              >
                {f === 'latest' ? '⏱ Latest' : '🔥 Popular'}
              </button>
            ))}
          </div>
        </div>

        {/* ── Post Grid ─────────────────────────────────────── */}
        {sorted.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <div className="text-6xl mb-4 animate-float">🌌</div>
            <p className="text-slate-400 text-lg">The cosmos is empty…</p>
            <p className="text-slate-600 text-sm mt-2">Be the first to send a post into orbit!</p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {sorted.map((post, i) => (
              <PostCard key={post.id} post={post} index={i} />
            ))}
          </motion.div>
        )}
      </div>

      {/* ── FAB: Create Post ──────────────────────────────── */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.12, boxShadow: '0 0 40px rgba(124,58,237,0.7)' }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/create')}
        id="fab-create-post"
        className="fixed bottom-8 right-8 w-16 h-16 rounded-2xl flex items-center justify-center text-2xl z-30 animate-float"
        style={{
          background: 'linear-gradient(135deg,#7c3aed,#3b82f6)',
          boxShadow: '0 0 30px rgba(124,58,237,0.5), 0 8px 32px rgba(0,0,0,0.4)',
          border: '1px solid rgba(168,85,247,0.4)',
        }}
        title="Create Post"
      >
        ✍️
      </motion.button>
    </motion.div>
  )
}
