export interface Quiz {
    id: string;
    title: string;
    questions: Question[];
}

export interface QuizzesState {
    quizzes: Quiz[];
}

export interface Answer {
    id: string;
    questionId: string;
    text: string;
    isCorrect: boolean;
    type: string;
}

export interface Question {
    id: string;
    quizId: string;
    type: string;
    title: string;
    score: number;
    answers: Answer[];
    userAnswer?: string | string[];
}

