import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

const pageVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -20, transition: { duration: 0.3 } },
}

export default function Register() {
  const { register }          = useAuth()
  const navigate               = useNavigate()
  const [form, setForm]        = useState({ username: '', password: '', confirm: '' })
  const [error, setError]      = useState('')
  const [loading, setLoading]  = useState(false)
  const [shake, setShake]      = useState(false)

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const triggerShake = () => {
    setShake(true)
    setTimeout(() => setShake(false), 500)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.username.trim() || !form.password.trim()) {
      setError('Please fill in all fields.'); triggerShake(); return
    }
    if (form.username.trim().length < 3) {
      setError('Username must be at least 3 characters.'); triggerShake(); return
    }
    if (form.password.length < 4) {
      setError('Password must be at least 4 characters.'); triggerShake(); return
    }
    if (form.password !== form.confirm) {
      setError('Passwords do not match.'); triggerShake(); return
    }
    setLoading(true)
    await new Promise((r) => setTimeout(r, 700))
    const result = register(form.username.trim(), form.password)
    if (!result.ok) {
      setError(result.error); triggerShake()
    } else {
      navigate('/')
    }
    setLoading(false)
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen flex items-center justify-center px-4 relative z-10 py-12"
    >
      {/* Ambient glow blobs */}
      <div className="fixed top-1/3 right-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      <div className="fixed bottom-1/3 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)', filter: 'blur(40px)' }} />

      <div className="w-full max-w-md">
        {/* Floating logo */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex justify-center mb-8"
        >
          <div className="text-center">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-4"
              style={{
                background: 'linear-gradient(135deg,#ec4899,#7c3aed)',
                boxShadow: '0 0 40px rgba(236,72,153,0.4), 0 0 80px rgba(236,72,153,0.15)',
              }}
            >
              🌌
            </div>
            <h1
              className="font-display font-bold text-2xl"
              style={{
                background: 'linear-gradient(90deg,#ec4899,#a855f7,#06b6d4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              JOIN THE VERSE
            </h1>
            <p className="text-slate-500 text-sm mt-1 tracking-widest uppercase">Create your orbit</p>
          </div>
        </motion.div>

        {/* Card */}
        <motion.div
          animate={shake ? { x: [-8, 8, -6, 6, -3, 3, 0] } : { x: 0 }}
          transition={{ duration: 0.4 }}
          className="glass-card rounded-2xl p-8"
        >
          <div className="h-0.5 w-full rounded-full mb-8"
            style={{ background: 'linear-gradient(90deg,#ec4899,#a855f7,#06b6d4)' }} />

          <h2 className="text-2xl font-bold text-white mb-2">Create account</h2>
          <p className="text-slate-500 text-sm mb-8">Begin your zero-gravity journey</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Username</label>
              <input
                type="text"
                name="username"
                id="register-username"
                value={form.username}
                onChange={handleChange}
                placeholder="Choose a username"
                autoComplete="username"
                className="input-glow w-full px-4 py-3 rounded-xl text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Password</label>
              <input
                type="password"
                name="password"
                id="register-password"
                value={form.password}
                onChange={handleChange}
                placeholder="Create a password (min 4 chars)"
                autoComplete="new-password"
                className="input-glow w-full px-4 py-3 rounded-xl text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Confirm Password</label>
              <input
                type="password"
                name="confirm"
                id="register-confirm"
                value={form.confirm}
                onChange={handleChange}
                placeholder="Repeat your password"
                autoComplete="new-password"
                className="input-glow w-full px-4 py-3 rounded-xl text-sm"
              />
            </div>

            {/* Password strength indicator */}
            {form.password && (
              <div className="space-y-1">
                <div className="flex gap-1">
                  {[1,2,3,4].map((lvl) => (
                    <div key={lvl} className="h-1 flex-1 rounded-full transition-all duration-300"
                      style={{
                        background: form.password.length >= lvl * 2
                          ? lvl <= 1 ? '#ef4444' : lvl <= 2 ? '#f97316' : lvl <= 3 ? '#eab308' : '#22c55e'
                          : 'rgba(255,255,255,0.1)',
                      }}
                    />
                  ))}
                </div>
                <p className="text-xs text-slate-500">
                  Strength: {form.password.length < 4 ? '🔴 Weak' : form.password.length < 6 ? '🟡 Fair' : form.password.length < 8 ? '🟢 Good' : '💪 Strong'}
                </p>
              </div>
            )}

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

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              id="register-submit"
              disabled={loading}
              className="btn-primary w-full py-3.5 rounded-xl text-white text-sm"
              style={{ background: 'linear-gradient(135deg,#db2777,#7c3aed)' }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <motion.span animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>⚙️</motion.span>
                    <span>Creating orbit...</span>
                  </>
                ) : (
                  <><span>🌌</span><span>Enter the Verse</span></>
                )}
              </span>
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-500 text-sm">
              Already orbiting?{' '}
              <Link to="/login"
                className="font-medium transition-all duration-300 hover:text-purple-300"
                style={{ color: '#ec4899' }}>
                Sign in →
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
