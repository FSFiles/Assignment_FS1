import { motion } from 'framer-motion';

const MeshBackground = ({ variant = 'auth' }) => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
    <div className={`absolute inset-0 ${variant === 'auth' ? 'bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950' : ''}`} />
    <motion.div
      animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
      transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-indigo-600/25 blur-[100px]"
    />
    <motion.div
      animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
      transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute top-1/3 -right-32 w-[450px] h-[450px] rounded-full bg-purple-600/20 blur-[100px]"
    />
    <motion.div
      animate={{ x: [0, 20, 0], y: [0, 40, 0] }}
      transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute -bottom-32 left-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/15 blur-[90px]"
    />
    {variant === 'dashboard' && (
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.08),transparent_50%)]" />
    )}
    <div
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
      }}
    />
  </div>
);

export default MeshBackground;
