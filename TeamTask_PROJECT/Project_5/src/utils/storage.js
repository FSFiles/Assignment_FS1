// ─── Storage helpers ───────────────────────────────────────────
const KEYS = {
  users:       'ag_users',
  currentUser: 'ag_currentUser',
  posts:       'ag_posts',
};

export const getUsers = () =>
  JSON.parse(localStorage.getItem(KEYS.users) || '[]');

export const saveUsers = (users) =>
  localStorage.setItem(KEYS.users, JSON.stringify(users));

export const getCurrentUser = () =>
  localStorage.getItem(KEYS.currentUser);

export const setCurrentUser = (username) =>
  localStorage.setItem(KEYS.currentUser, username);

export const clearCurrentUser = () =>
  localStorage.removeItem(KEYS.currentUser);

export const getPosts = () =>
  JSON.parse(localStorage.getItem(KEYS.posts) || '[]');

export const savePosts = (posts) =>
  localStorage.setItem(KEYS.posts, JSON.stringify(posts));
