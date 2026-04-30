import { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

const NAV_LINKS = [
  { to: '/',        label: 'Home',    icon: '🏠' },
  { to: '/explore', label: 'Explore', icon: '🔭' },
  { to: '/create',  label: 'Post',    icon: '✍️' },
]

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate         = useNavigate()
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0,   opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'navbar-scrolled' : ''
      }`}
      style={{
        background: scrolled
          ? 'rgba(5,2,16,0.85)'
          : 'rgba(5,2,16,0.4)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(168,85,247,0.15)',
        boxShadow: scrolled
          ? '0 4px 30px rgba(0,0,0,0.5), 0 0 40px rgba(168,85,247,0.05)'
          : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ─────────────────────────────────────────── */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 cursor-pointer select-none animate-float"
            onClick={() => navigate('/')}
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
              style={{
                background: 'linear-gradient(135deg,#7c3aed,#3b82f6)',
                boxShadow: '0 0 20px rgba(124,58,237,0.5)',
              }}
            >
              ⚛
            </div>
            <span
              className="font-display font-bold text-xl text-glow-purple"
              style={{
                background: 'linear-gradient(90deg,#a855f7,#3b82f6,#06b6d4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '1px',
              }}
            >
              SLAGRAM
            </span>
          </motion.div>

          {/* ── Desktop Links ─────────────────────────────────── */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ to, label, icon }) => (
              <NavLink key={to} to={to} end={to === '/'}>
                {({ isActive }) => (
                  <motion.div
                    whileHover={{ y: -2 }}
                    className="relative px-4 py-2 rounded-xl transition-all duration-300"
                    style={{
                      color: isActive ? '#a855f7' : 'rgba(226,232,240,0.7)',
                      background: isActive ? 'rgba(168,85,247,0.1)' : 'transparent',
                    }}
                  >
                    <span className="flex items-center gap-2 text-sm font-medium">
                      <span>{icon}</span>
                      <span>{label}</span>
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="navbar-underline"
                        className="absolute bottom-1 left-4 right-4 h-0.5 rounded-full"
                        style={{ background: 'linear-gradient(90deg,#a855f7,#3b82f6)' }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </motion.div>
                )}
              </NavLink>
            ))}
          </div>

          {/* ── User + Logout ─────────────────────────────────── */}
          <div className="hidden md:flex items-center gap-3">
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm"
              style={{
                background: 'rgba(168,85,247,0.1)',
                border: '1px solid rgba(168,85,247,0.25)',
                color: '#c4b5fd',
              }}
            >
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs"
                style={{ background: 'linear-gradient(135deg,#7c3aed,#3b82f6)' }}>
                👤
              </span>
              <span className="font-medium">{user}</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(236,72,153,0.4)' }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="px-4 py-1.5 rounded-xl text-sm font-medium transition-all duration-300"
              style={{
                background: 'rgba(236,72,153,0.1)',
                border: '1px solid rgba(236,72,153,0.3)',
                color: '#f9a8d4',
              }}
            >
              Logout 🚀
            </motion.button>
          </div>

          {/* ── Mobile Hamburger ──────────────────────────────── */}
          <button
            className="md:hidden p-2 rounded-lg text-purple-300"
            onClick={() => setMenuOpen((v) => !v)}
            style={{ background: 'rgba(168,85,247,0.1)' }}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ───────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden"
            style={{ borderTop: '1px solid rgba(168,85,247,0.15)' }}
          >
            <div className="px-4 py-4 flex flex-col gap-2">
              {NAV_LINKS.map(({ to, label, icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'text-purple-400 bg-purple-500/10 border border-purple-500/25'
                        : 'text-slate-300 hover:bg-white/5'
                    }`
                  }
                >
                  <span>{icon}</span>
                  <span>{label}</span>
                </NavLink>
              ))}
              <button
                onClick={() => { handleLogout(); setMenuOpen(false) }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-pink-300 hover:bg-pink-500/10 border border-pink-500/20 transition-all"
              >
                <span>🚀</span>
                <span>Logout</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
