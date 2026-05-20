import { ddlLessons } from './ddlLessons';
import { dmlLessons } from './dmlLessons';
import { dqlLessons } from './dqlLessons';

export const sqlLessonsData = {
  DDL: ddlLessons,
  DML: dmlLessons,
  DQL: dqlLessons,
};

export const allLessons = [...ddlLessons, ...dmlLessons, ...dqlLessons];

export const lessonStats = {
  total: allLessons.length,
  byCategory: {
    DDL: ddlLessons.length,
    DML: dmlLessons.length,
    DQL: dqlLessons.length,
  },
  byDifficulty: {
    Beginner: allLessons.filter(l => l.difficulty === 'Beginner').length,
    Intermediate: allLessons.filter(l => l.difficulty === 'Intermediate').length,
    Advanced: allLessons.filter(l => l.difficulty === 'Advanced').length,
  },
};
