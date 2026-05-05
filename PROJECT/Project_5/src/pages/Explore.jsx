import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import PostCard from '../components/PostCard'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -20, transition: { duration: 0.3 } },
}

const TAGS = ['All', 'Latest', 'Popular', 'My Posts']

export default function Explore() {
  const { posts, user }       = useAuth()
  const [query, setQuery]     = useState('')
  const [activeTag, setActiveTag] = useState('All')
  const [searchFocused, setSearchFocused] = useState(false)

  const filtered = useMemo(() => {
    let result = [...posts]

    // Tag filter
    if (activeTag === 'Latest')   result = result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    if (activeTag === 'Popular')  result = result.sort((a, b) => b.likes.length - a.likes.length)
    if (activeTag === 'My Posts') result = result.filter((p) => p.author === user)

    // Search filter
    if (query.trim()) {
      const q = query.toLowerCase()
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.content.toLowerCase().includes(q) ||
          p.author.toLowerCase().includes(q)
      )
    }

    return result
  }, [posts, query, activeTag, user])

  // Split into 3 columns for masonry
  const columns = [[], [], []]
  filtered.forEach((post, i) => columns[i % 3].push(post))

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative z-10 min-h-screen pt-24 pb-20 px-4"
    >
      {/* Ambient glow blobs */}
      <div className="fixed top-1/4 right-1/4 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle,rgba(6,182,212,0.08) 0%,transparent 70%)', filter: 'blur(50px)' }} />
      <div className="fixed bottom-1/4 left-1/4 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle,rgba(168,85,247,0.08) 0%,transparent 70%)', filter: 'blur(50px)' }} />

      <div className="max-w-7xl mx-auto">

        {/* ── Page Header ───────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <motion.div
            animate={{ y: [0, -8, 0], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="text-5xl mb-4 inline-block"
          >
            🔭
          </motion.div>
          <h1
            className="font-display font-black text-4xl sm:text-5xl mb-3"
            style={{
              background: 'linear-gradient(90deg,#06b6d4,#a855f7,#3b82f6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            EXPLORE
          </h1>
          <p className="text-slate-500 text-sm">Discover ideas floating across the cosmos</p>
        </motion.div>

        {/* ── Search Bar ────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex justify-center mb-6"
        >
          <motion.div
            animate={{ width: searchFocused ? '100%' : '80%' }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="relative max-w-2xl w-full"
          >
            {/* Search icon */}
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-lg pointer-events-none">
              🔍
            </span>
            <input
              type="text"
              id="explore-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              placeholder="Search posts, authors, topics…"
              className="input-glow w-full pl-12 pr-12 py-4 rounded-2xl text-sm"
              style={{
                boxShadow: searchFocused
                  ? '0 0 0 3px rgba(168,85,247,0.2), 0 0 30px rgba(168,85,247,0.25), 0 8px 32px rgba(0,0,0,0.4)'
                  : '0 8px 32px rgba(0,0,0,0.3)',
              }}
            />
            {/* Clear button */}
            <AnimatePresence>
              {query && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => setQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors text-lg"
                >
                  ✕
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* ── Tag Filters ───────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-10"
        >
          {TAGS.map((tag) => (
            <motion.button
              key={tag}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTag(tag)}
              className="px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300"
              style={{
                background: activeTag === tag
                  ? 'linear-gradient(135deg,#7c3aed,#3b82f6)'
                  : 'rgba(255,255,255,0.04)',
                border: activeTag === tag
                  ? '1px solid rgba(168,85,247,0.5)'
                  : '1px solid rgba(255,255,255,0.08)',
                color: activeTag === tag ? 'white' : 'rgba(226,232,240,0.5)',
                boxShadow: activeTag === tag ? '0 0 20px rgba(124,58,237,0.3)' : 'none',
              }}
            >
              {tag === 'All' && '🌌 '}
              {tag === 'Latest' && '⏱ '}
              {tag === 'Popular' && '🔥 '}
              {tag === 'My Posts' && '👤 '}
              {tag}
            </motion.button>
          ))}
        </motion.div>

        {/* ── Results count ─────────────────────────────────── */}
        <motion.div
          layout
          className="flex items-center gap-2 mb-6"
        >
          <div className="h-px flex-1"
            style={{ background: 'linear-gradient(90deg,transparent,rgba(168,85,247,0.3),transparent)' }} />
          <span className="text-xs text-slate-500 px-3">
            {filtered.length} post{filtered.length !== 1 ? 's' : ''} found
          </span>
          <div className="h-px flex-1"
            style={{ background: 'linear-gradient(90deg,transparent,rgba(168,85,247,0.3),transparent)' }} />
        </motion.div>

        {/* ── Masonry Grid ──────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-24"
            >
              <div className="text-6xl mb-4 animate-float">
                {query ? '🔭' : '🌌'}
              </div>
              <p className="text-slate-400 text-lg mb-2">
                {query ? `No posts match "${query}"` : 'Nothing here yet'}
              </p>
              <p className="text-slate-600 text-sm">
                {query ? 'Try different keywords' : 'Be the first to post!'}
              </p>
              {query && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setQuery('')}
                  className="mt-5 px-6 py-2 rounded-xl text-sm font-medium text-purple-300 transition-all"
                  style={{ background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.3)' }}
                >
                  Clear search
                </motion.button>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {columns.map((col, ci) => (
                <div key={ci} className="flex flex-col gap-6">
                  {col.map((post, pi) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: (ci * 0.1) + (pi * 0.08) }}
                    >
                      <PostCard post={post} index={ci * 10 + pi} />
                    </motion.div>
                  ))}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile single-column */}
        <div className="sm:hidden flex flex-col gap-6">
          {filtered.map((post, i) => (
            <PostCard key={post.id} post={post} index={i} />
          ))}
        </div>

      </div>
    </motion.div>
  )
}
