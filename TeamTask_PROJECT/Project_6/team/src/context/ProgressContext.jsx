import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { allLessons } from '../data/sqlLessons';

const STORAGE_KEY = 'sql_study_progress';

const ProgressContext = createContext(null);

export const ProgressProvider = ({ children }) => {
  const { user } = useAuth();
  const [completedIds, setCompletedIds] = useState([]);

  const storageKey = user ? `${STORAGE_KEY}_${user.id}` : null;

  useEffect(() => {
    if (!storageKey) {
      setCompletedIds([]);
      return;
    }
    const saved = localStorage.getItem(storageKey);
    setCompletedIds(saved ? JSON.parse(saved) : []);
  }, [storageKey]);

  const toggleComplete = useCallback((lessonId) => {
    if (!storageKey) return;
    setCompletedIds(prev => {
      const next = prev.includes(lessonId)
        ? prev.filter(id => id !== lessonId)
        : [...prev, lessonId];
      localStorage.setItem(storageKey, JSON.stringify(next));
      return next;
    });
  }, [storageKey]);

  const isCompleted = useCallback((lessonId) => completedIds.includes(lessonId), [completedIds]);

  const progressPercent = allLessons.length
    ? Math.round((completedIds.length / allLessons.length) * 100)
    : 0;

  const categoryProgress = (category) => {
    const catLessons = allLessons.filter(l => l.category === category);
    if (!catLessons.length) return 0;
    const done = catLessons.filter(l => completedIds.includes(l.id)).length;
    return Math.round((done / catLessons.length) * 100);
  };

  return (
    <ProgressContext.Provider value={{
      completedIds,
      completedCount: completedIds.length,
      totalLessons: allLessons.length,
      progressPercent,
      toggleComplete,
      isCompleted,
      categoryProgress,
    }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider');
  return ctx;
};
