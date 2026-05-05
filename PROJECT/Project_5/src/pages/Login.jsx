import { useState, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

const pageVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -20, transition: { duration: 0.3 } },
}

export default function Login() {
  const { login }           = useAuth()
  const navigate            = useNavigate()
  const [form, setForm]     = useState({ username: '', password: '' })
  const [error, setError]   = useState('')
  const [loading, setLoading] = useState(false)
  const [shake, setShake]   = useState(false)

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
      setError('Please fill in all fields.')
      triggerShake()
      return
    }
    setLoading(true)
    await new Promise((r) => setTimeout(r, 600)) // brief loading feel
    const result = login(form.username.trim(), form.password)
    if (!result.ok) {
      setError(result.error)
      triggerShake()
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
      className="min-h-screen flex items-center justify-center px-4 relative z-10"
    >
      {/* Ambient glow blobs */}
      <div className="fixed top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)', filter: 'blur(40px)' }} />

      <div className="w-full max-w-md">
        {/* Floating logo */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="flex justify-center mb-8"
        >
          <div className="text-center">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-4"
              style={{
                background: 'linear-gradient(135deg,#7c3aed,#3b82f6)',
                boxShadow: '0 0 40px rgba(124,58,237,0.5), 0 0 80px rgba(124,58,237,0.2)',
              }}
            >
              ⚛
            </div>
            <h1
              className="font-display font-bold text-2xl"
              style={{
                background: 'linear-gradient(90deg,#a855f7,#3b82f6,#06b6d4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              SLAGRAM
            </h1>
            <p className="text-slate-500 text-sm mt-1 tracking-widest uppercase">Blog Platform</p>
          </div>
        </motion.div>

        {/* Card */}
        <motion.div
          animate={shake ? { x: [-8, 8, -6, 6, -3, 3, 0] } : { x: 0 }}
          transition={{ duration: 0.4 }}
          className="glass-card rounded-2xl p-8"
        >
          {/* Top glow bar */}
          <div className="h-0.5 w-full rounded-full mb-8"
            style={{ background: 'linear-gradient(90deg,#7c3aed,#3b82f6,#06b6d4)' }} />

          <h2 className="text-2xl font-bold text-white mb-2">Welcome back</h2>
          <p className="text-slate-500 text-sm mb-8">Sign in to your zero-gravity space</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Username</label>
              <input
                type="text"
                name="username"
                id="login-username"
                value={form.username}
                onChange={handleChange}
                placeholder="Enter your username"
                autoComplete="username"
                className="input-glow w-full px-4 py-3 rounded-xl text-sm"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Password</label>
              <input
                type="password"
                name="password"
                id="login-password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                autoComplete="current-password"
                className="input-glow w-full px-4 py-3 rounded-xl text-sm"
              />
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

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              id="login-submit"
              disabled={loading}
              className="btn-primary w-full py-3.5 rounded-xl text-white text-sm relative z-10"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="inline-block"
                    >⚙️</motion.span>
                    <span>Launching...</span>
                  </>
                ) : (
                  <><span>🚀</span><span>Launch into Space</span></>
                )}
              </span>
            </motion.button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-slate-500 text-sm">
              New to the cosmos?{' '}
              <Link
                to="/register"
                className="font-medium transition-all duration-300 hover:text-purple-300"
                style={{ color: '#a855f7' }}
              >
                Create account →
              </Link>
            </p>
          </div>

          {/* Demo hint */}
          <div className="mt-5 p-4 rounded-xl text-xs text-slate-500"
            style={{ background: 'rgba(168,85,247,0.05)', border: '1px solid rgba(168,85,247,0.1)' }}>
            💡 <strong className="text-slate-400">Demo:</strong> Register a new account to get started instantly.
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
