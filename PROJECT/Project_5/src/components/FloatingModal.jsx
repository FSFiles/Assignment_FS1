import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function FloatingModal({ isOpen, onClose, children, title }) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-40"
            style={{ background: 'rgba(5,2,16,0.75)', backdropFilter: 'blur(6px)' }}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0,  scale: 1 }}
            exit={{ opacity: 0,  y: 40,  scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 max-w-lg mx-auto rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(15,8,40,0.95) 0%, rgba(10,5,30,0.97) 100%)',
              border: '1px solid rgba(168,85,247,0.3)',
              boxShadow: '0 25px 60px rgba(0,0,0,0.8), 0 0 60px rgba(168,85,247,0.1)',
            }}
          >
            {/* Top glow bar */}
            <div
              className="h-0.5 w-full"
              style={{ background: 'linear-gradient(90deg,#7c3aed,#3b82f6,#06b6d4)' }}
            />

            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2
                  className="text-xl font-bold font-display"
                  style={{
                    background: 'linear-gradient(90deg,#a855f7,#3b82f6)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {title}
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  ✕
                </motion.button>
              </div>

              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
