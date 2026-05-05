import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('profood_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (userData) => {
    const newUser = { ...userData, orders: [] };
    setUser(newUser);
    localStorage.setItem('profood_user', JSON.stringify(newUser));
  };

  const updateUser = (updates) => {
    setUser(prev => {
      const updated = { ...prev, ...updates };
      localStorage.setItem('profood_user', JSON.stringify(updated));
      return updated;
    });
  };

  const addOrder = (order) => {
    setUser(prev => {
      const updated = { ...prev, orders: [order, ...(prev.orders || [])] };
      localStorage.setItem('profood_user', JSON.stringify(updated));
      return updated;
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('profood_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, updateUser, addOrder, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
