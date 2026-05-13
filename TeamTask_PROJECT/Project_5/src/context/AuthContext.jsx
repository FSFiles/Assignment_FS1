import { createContext, useContext, useState, useEffect } from 'react';
import {
  getUsers, saveUsers,
  getCurrentUser, setCurrentUser, clearCurrentUser,
  getPosts, savePosts,
} from '../utils/storage';

// ─── Seed Demo Posts ───────────────────────────────────────────
const DEMO_POSTS = [
  {
    id: 'demo-1',
    author: 'nova',
    title: 'Welcome to the Zero-Gravity Verse',
    content:
      'In the vacuum of ideas, thoughts float freely — unbound by gravity, unshackled by convention. This is where we write. This is where we dream. Antigravity Blog is your space station for ideas that defy limits.',
    likes: ['luna', 'orion'],
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    id: 'demo-2',
    author: 'luna',
    title: 'The Art of Floating Through Code',
    content:
      'Every great developer knows the secret: code should feel weightless. When your architecture is clean and your logic flows like stardust through the cosmos, you have achieved true zero-gravity engineering.',
    likes: ['nova'],
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
  },
  {
    id: 'demo-3',
    author: 'orion',
    title: 'Neon Dreams & Glassmorphism Realities',
    content:
      'Design in 2025 is all about depth. Blur the boundaries between real and virtual — let glass panels float over nebulae, let neon glow pierce the darkness. UI is the new poetry of our civilization.',
    likes: ['nova', 'luna', 'zeta'],
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
];

// ─── Context ───────────────────────────────────────────────────
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser]   = useState(getCurrentUser());
  const [posts, setPosts] = useState(() => {
    const stored = getPosts();
    if (stored.length === 0) {
      savePosts(DEMO_POSTS);
      return DEMO_POSTS;
    }
    return stored;
  });

  // Keep localStorage in sync whenever posts state changes
  useEffect(() => { savePosts(posts); }, [posts]);

  /* ── Auth ── */
  const register = (username, password) => {
    const users = getUsers();
    if (users.find((u) => u.username === username)) {
      return { ok: false, error: 'Username already taken' };
    }
    const updated = [...users, { username, password }];
    saveUsers(updated);
    setCurrentUser(username);
    setUser(username);
    return { ok: true };
  };

  const login = (username, password) => {
    const users = getUsers();
    const match = users.find((u) => u.username === username && u.password === password);
    if (!match) return { ok: false, error: 'Invalid credentials' };
    setCurrentUser(username);
    setUser(username);
    return { ok: true };
  };

  const logout = () => {
    clearCurrentUser();
    setUser(null);
  };

  /* ── Posts ── */
  const addPost = ({ title, content }) => {
    const newPost = {
      id:        crypto.randomUUID(),
      author:    user,
      title,
      content,
      likes:     [],
      createdAt: new Date().toISOString(),
    };
    setPosts((prev) => [newPost, ...prev]);
  };

  const toggleLike = (postId) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        const liked = p.likes.includes(user);
        return {
          ...p,
          likes: liked
            ? p.likes.filter((u) => u !== user)
            : [...p.likes, user],
        };
      })
    );
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, posts, addPost, toggleLike }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
