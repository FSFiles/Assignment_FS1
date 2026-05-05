import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const pageVariants = {
  initial: { opacity: 0, y: 30, scale: 0.98 },
  animate: { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -20, scale: 0.98, transition: { duration: 0.3 } },
}

// Ripple helper
function useRipple() {
  const [ripples, setRipples] = useState([])
  const addRipple = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const id = Date.now()
    setRipples((r) => [...r, { x, y, id }])
    setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 700)
  }
  return [ripples, addRipple]
}

export default function CreatePost() {
  const { addPost }         = useAuth()
  const navigate             = useNavigate()
  const [form, setForm]      = useState({ title: '', content: '' })
  const [error, setError]    = useState('')
  const [success, setSuccess]= useState(false)
  const [loading, setLoading]= useState(false)
  const [ripples, addRipple] = useRipple()
  const charLimit             = 1000

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    addRipple(e)
    setError('')
    if (!form.title.trim())   { setError('Give your post a title.'); return }
    if (!form.content.trim()) { setError('Write something in your post.'); return }
    if (form.content.length > charLimit) { setError(`Content must be under ${charLimit} characters.`); return }

    setLoading(true)
    await new Promise((r) => setTimeout(r, 700))
    addPost({ title: form.title.trim(), content: form.content.trim() })
    setSuccess(true)
    await new Promise((r) => setTimeout(r, 1200))
    navigate('/')
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative z-10 min-h-screen pt-24 pb-20 px-4 flex items-start justify-center"
    >
      {/* Ambient blobs */}
      <div className="fixed top-1/3 left-1/3 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle,rgba(124,58,237,0.12) 0%,transparent 70%)', filter: 'blur(50px)' }} />
      <div className="fixed bottom-1/3 right-1/3 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle,rgba(6,182,212,0.08) 0%,transparent 70%)', filter: 'blur(50px)' }} />

      <div className="w-full max-w-2xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-8"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="text-5xl mb-4 inline-block"
          >
            ✍️
          </motion.div>
          <h1
            className="font-display font-bold text-3xl sm:text-4xl mb-2"
            style={{
              background: 'linear-gradient(90deg,#a855f7,#3b82f6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            LAUNCH A POST
          </h1>
          <p className="text-slate-500 text-sm">Send your ideas into orbit</p>
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-2xl p-8"
        >
          {/* Top glow bar */}
          <div className="h-0.5 w-full rounded-full mb-8 shimmer-bg" />

          {/* Success state */}
          {success ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-12"
            >
              <motion.div
                animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.8 }}
                className="text-6xl mb-4"
              >
                🚀
              </motion.div>
              <h3 className="text-xl font-bold text-white mb-2">Post launched!</h3>
              <p className="text-slate-400 text-sm">Redirecting to feed…</p>
              <div className="mt-4 flex justify-center">
                <div className="flex gap-1">
                  {[0,1,2].map((i) => (
                    <motion.div key={i}
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                      className="w-2 h-2 rounded-full"
                      style={{ background: '#a855f7' }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Title */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <span>📡</span> Post Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="create-title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="A title that defies gravity…"
                  maxLength={100}
                  className="input-glow w-full px-4 py-3 rounded-xl text-sm font-medium"
                />
                <p className="text-xs text-slate-600 text-right">{form.title.length}/100</p>
              </div>

              {/* Content */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <span>🌌</span> Content
                </label>
                <textarea
                  name="content"
                  id="create-content"
                  value={form.content}
                  onChange={handleChange}
                  placeholder="Write your thoughts into the cosmos…"
                  rows={8}
                  maxLength={charLimit}
                  className="input-glow w-full px-4 py-3 rounded-xl text-sm resize-none leading-relaxed"
                />
                <div className="flex items-center justify-between">
                  <div className="h-1 flex-1 mr-4 rounded-full overflow-hidden"
                    style={{ background: 'rgba(255,255,255,0.05)' }}>
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${(form.content.length / charLimit) * 100}%`,
                        background: form.content.length > charLimit * 0.9
                          ? 'linear-gradient(90deg,#ef4444,#f97316)'
                          : 'linear-gradient(90deg,#7c3aed,#3b82f6)',
                      }}
                    />
                  </div>
                  <p className={`text-xs ${form.content.length > charLimit * 0.9 ? 'text-orange-400' : 'text-slate-600'}`}>
                    {form.content.length}/{charLimit}
                  </p>
                </div>
              </div>

              {/* Error */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm"
                  style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5' }}
                >
                  <span>⚠️</span> {error}
                </motion.div>
              )}

              {/* Action buttons */}
              <div className="flex items-center gap-3 pt-2">
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => navigate('/')}
                  className="btn-glass flex-1 py-3.5 rounded-xl text-slate-300 text-sm font-medium"
                >
                  Cancel
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  id="create-submit"
                  disabled={loading}
                  onClick={addRipple}
                  className="btn-primary flex-[2] py-3.5 rounded-xl text-white text-sm relative overflow-hidden"
                >
                  {/* Ripple effects */}
                  {ripples.map((r) => (
                    <span key={r.id} className="btn-ripple"
                      style={{ left: r.x, top: r.y }} />
                  ))}
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {loading ? (
                      <>
                        <motion.span animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>⚙️</motion.span>
                        <span>Launching…</span>
                      </>
                    ) : (
                      <><span>🚀</span><span>Launch Post</span></>
                    )}
                  </span>
                </motion.button>
              </div>
            </form>
          )}
        </motion.div>

        {/* Writing tips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 p-4 rounded-xl text-xs text-slate-500 text-center"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
        >
          ✨ Tips: Be authentic · Think big · Write freely · Let ideas orbit
        </motion.div>
      </div>
    </motion.div>
  )
}
