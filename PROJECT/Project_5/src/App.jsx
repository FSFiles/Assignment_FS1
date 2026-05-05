import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import ParticleBackground from './components/ParticleBackground'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Explore from './pages/Explore'
import CreatePost from './pages/CreatePost'
import { useAuth } from './context/AuthContext'

export default function App() {
  const location = useLocation()
  const { user } = useAuth()
  const isAuthPage = ['/login', '/register'].includes(location.pathname)

  return (
    <div className="relative min-h-screen">
      {/* Space particle background — always visible */}
      <ParticleBackground />

      {/* Navbar only when logged in */}
      {user && !isAuthPage && <Navbar />}

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/explore" element={
            <ProtectedRoute>
              <Explore />
            </ProtectedRoute>
          } />
          <Route path="/create" element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          } />
          {/* Catch-all → login */}
          <Route path="*" element={<Login />} />
        </Routes>
      </AnimatePresence>
    </div>
  )
}
