import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Home from './pages/Home';
import LoginRegister from './pages/LoginRegister';
import PhoneOtp from './pages/PhoneOtp';
import LocationPicker from './pages/LocationPicker';
import NameEntry from './pages/NameEntry';
import FoodSection from './pages/FoodSection';
import GroceriesSection from './pages/GroceriesSection';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Profile from './pages/Profile';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginRegister />} />
      <Route path="/phone-otp" element={<PhoneOtp />} />
      <Route path="/location" element={<ProtectedRoute><LocationPicker /></ProtectedRoute>} />
      <Route path="/name" element={<ProtectedRoute><NameEntry /></ProtectedRoute>} />
      <Route path="/food" element={<ProtectedRoute><FoodSection /></ProtectedRoute>} />
      <Route path="/groceries" element={<ProtectedRoute><GroceriesSection /></ProtectedRoute>} />
      <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
      <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
      <Route path="/order-success" element={<ProtectedRoute><OrderSuccess /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Toaster position="top-center" toastOptions={{ style: { background: '#1e1e2e', color: '#fff', border: '1px solid #ff6b35' } }} />
          <AppRoutes />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
