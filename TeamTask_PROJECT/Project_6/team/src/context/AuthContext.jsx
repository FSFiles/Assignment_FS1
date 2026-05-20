import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('sql_study_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const register = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('sql_study_users') || '[]');
    const exists = users.find(u => u.email === email);
    if (exists) {
      throw new Error('User with this email already exists');
    }
    const newUser = { id: Date.now(), name, email, password, joinedAt: new Date().toISOString() };
    users.push(newUser);
    localStorage.setItem('sql_study_users', JSON.stringify(users));
    const { password: _, ...safeUser } = newUser;
    setUser(safeUser);
    localStorage.setItem('sql_study_user', JSON.stringify(safeUser));
    return safeUser;
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('sql_study_users') || '[]');
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) {
      throw new Error('Invalid email or password');
    }
    const { password: _, ...safeUser } = found;
    setUser(safeUser);
    localStorage.setItem('sql_study_user', JSON.stringify(safeUser));
    return safeUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sql_study_user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
