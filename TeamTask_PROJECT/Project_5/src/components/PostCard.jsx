import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

const FLOAT_DELAYS = [0, 0.5, 1, 1.5]

export default function PostCard({ post, index = 0 }) {
  const { user, toggleLike } = useAuth()
  const [justLiked, setJustLiked] = useState(false)
  const [tilt, setTilt]           = useState({ x: 0, y: 0 })
  const cardRef                   = useRef(null)
  const isLiked = post.likes.includes(user)

  // ── 3D tilt on mouse move ──────────────────────────────────
  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const cx   = rect.left + rect.width  / 2
    const cy   = rect.top  + rect.height / 2
    const dx   = (e.clientX - cx) / (rect.width  / 2)
    const dy   = (e.clientY - cy) / (rect.height / 2)
    setTilt({ x: -dy * 6, y: dx * 6 })
  }
  const handleMouseLeave = () => setTilt({ x: 0, y: 0 })

  // ── Like ──────────────────────────────────────────────────
  const handleLike = () => {
    toggleLike(post.id)
    if (!isLiked) {
      setJustLiked(true)
      setTimeout(() => setJustLiked(false), 600)
    }
  }

  const timeAgo = (iso) => {
    const diff  = Date.now() - new Date(iso).getTime()
    const mins  = Math.floor(diff / 60000)
    const hours = Math.floor(mins / 60)
    const days  = Math.floor(hours / 24)
    if (days  > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    if (mins  > 0) return `${mins}m ago`
    return 'just now'
  }

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.1, ease: 'easeOut' }}
      whileHover={{ y: -10 }}
      style={{
        perspective: 1000,
        rotateX: tilt.x,
        rotateY: tilt.y,
        transition: 'box-shadow 0.3s ease',
        animationDelay: `${FLOAT_DELAYS[index % FLOAT_DELAYS.length]}s`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="glass-card rounded-2xl p-6 cursor-default group relative overflow-hidden animate-float"
    >
      {/* ── Shimmer overlay on hover ─────────────────────────── */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{
          background:
            'linear-gradient(135deg, rgba(168,85,247,0.05) 0%, rgba(59,130,246,0.05) 100%)',
        }}
      />

      {/* ── Glow dot top-right ───────────────────────────────── */}
      <div
        className="absolute top-3 right-3 w-2 h-2 rounded-full opacity-60"
        style={{
          background: '#a855f7',
          boxShadow: '0 0 8px #a855f7, 0 0 16px #a855f7',
          animation: `starTwinkle ${2 + (index % 3)}s ease-in-out infinite`,
        }}
      />

      {/* ── Author row ───────────────────────────────────────── */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
          style={{
            background: `linear-gradient(135deg, hsl(${(post.author.charCodeAt(0) * 37) % 360},70%,45%), hsl(${(post.author.charCodeAt(0) * 73) % 360},70%,35%))`,
            boxShadow: `0 0 12px hsla(${(post.author.charCodeAt(0) * 37) % 360},70%,45%,0.4)`,
          }}
        >
          {post.author.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-purple-300 truncate">@{post.author}</p>
          <p className="text-xs text-slate-500">{timeAgo(post.createdAt)}</p>
        </div>
      </div>

      {/* ── Title ────────────────────────────────────────────── */}
      <h2
        className="text-lg font-bold mb-3 leading-tight"
        style={{
          background: 'linear-gradient(90deg, #e2e8f0, #c4b5fd)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {post.title}
      </h2>

      {/* ── Content preview ──────────────────────────────────── */}
      <p className="text-sm text-slate-400 leading-relaxed mb-5 line-clamp-3">
        {post.content}
      </p>

      {/* ── Divider ──────────────────────────────────────────── */}
      <div
        className="h-px mb-4"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.3), transparent)' }}
      />

      {/* ── Like button ──────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={handleLike}
          className={`like-btn text-sm font-medium transition-all duration-300 ${isLiked ? 'liked' : ''}`}
          style={{ color: isLiked ? '#ec4899' : 'rgba(226,232,240,0.5)' }}
        >
          <motion.span
            className="heart-icon text-base"
            animate={justLiked ? { scale: [1, 1.5, 0.9, 1.1, 1] } : { scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {isLiked ? '❤️' : '🤍'}
          </motion.span>
          <span>{post.likes.length}</span>
          <span className="hidden sm:inline">{isLiked ? 'Liked' : 'Like'}</span>
        </motion.button>

        {/* Tag chip */}
        <span
          className="text-xs px-3 py-1 rounded-full"
          style={{
            background: 'rgba(59,130,246,0.1)',
            border: '1px solid rgba(59,130,246,0.2)',
            color: '#93c5fd',
          }}
        >
          ⚡ blog
        </span>
      </div>
    </motion.article>
  )
}
