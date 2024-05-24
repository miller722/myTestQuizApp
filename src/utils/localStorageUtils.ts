// src/utils/localStorageUtils.ts
interface Quiz {
    id: string;
    title: string;
    questions: any[];
  }
  
  const QUIZZES_KEY = 'quizzes';
  
  export const getQuizzesFromStorage = (): Quiz[] => {
    const quizzes = localStorage.getItem(QUIZZES_KEY);
    return quizzes ? JSON.parse(quizzes) : [];
  };
  
  export const saveQuizzesToStorage = (quizzes: Quiz[]): void => {
    localStorage.setItem(QUIZZES_KEY, JSON.stringify(quizzes));
  };
  