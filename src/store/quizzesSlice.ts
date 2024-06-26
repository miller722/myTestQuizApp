
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Quiz, Question, Answer, QuizzesState } from './types';
import { v4 as uuidv4 } from 'uuid';

const initialState: QuizzesState = {
    quizzes: [],
};

const quizzesSlice = createSlice({
    name: 'quizzes',
    initialState,
    reducers: {
        addQuiz: (state, action: PayloadAction<{
            questions: Question[]; title: string ;  timeLimit: number
}>) => {
            const newQuiz: Quiz = {
                id: uuidv4(),
                title: action.payload.title,
                questions:  action.payload.questions,
                timeLimit: action.payload.timeLimit
            };
            state.quizzes.push(newQuiz);
        },
        editQuiz: (state, action: PayloadAction<Quiz>) => {
            const index = state.quizzes.findIndex(quiz => quiz.id === action.payload.id);
            if (index !== -1) {
                state.quizzes[index] = action.payload;
            }
        },
        deleteQuiz: (state, action: PayloadAction<string>) => {
            state.quizzes = state.quizzes.filter(quiz => quiz.id !== action.payload);
        },
        addQuestion: (state, action: PayloadAction<{ quizId: string; question: Partial<Question> }>) => {
            const quiz = state.quizzes.find(quiz => quiz.id === action.payload.quizId);
            if (quiz) {
                const newQuestion: Question = {
                    ...action.payload.question,
                    id: uuidv4(),
                    quizId: action.payload.quizId,
                    answers: [],
                    score: 1,
                    type: 'single', // default type
                } as Question;
                quiz.questions.push(newQuestion);
            }
        },
        editQuestion: (state, action: PayloadAction<{ quizId: string; question: Question }>) => {
            const quiz = state.quizzes.find(quiz => quiz.id === action.payload.quizId);
            if (quiz) {
                const questionIndex = quiz.questions.findIndex(q => q.id === action.payload.question.id);
                if (questionIndex !== -1) {
                    quiz.questions[questionIndex] = action.payload.question;
                }
            }
        },
        addAnswer: (state, action: PayloadAction<{ quizId: string; questionId: string; answer: Partial<Answer> }>) => {
            const quiz = state.quizzes.find(quiz => quiz.id === action.payload.quizId);
            if (quiz) {
                const question = quiz.questions.find(q => q.id === action.payload.questionId);
                if (question) {
                    const newAnswer: Answer = {
                        ...action.payload.answer,
                        id: uuidv4(),
                        questionId: action.payload.questionId,
                        isCorrect: false,
                    } as Answer;
                    question.answers.push(newAnswer);
                }
            }
        }

    },
});

export const {
    addQuiz,
    editQuiz,
    deleteQuiz,
    addQuestion,
    editQuestion,
    addAnswer,
} = quizzesSlice.actions;

export default quizzesSlice.reducer;
