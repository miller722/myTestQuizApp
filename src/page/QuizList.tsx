
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { QuizItem } from '../components/QuizItem';
import { useNavigate } from 'react-router-dom';

export const QuizList: React.FC = () => {
    const quizzes = useSelector((state: RootState) => state.quizzes.quizzes);
    const navigate = useNavigate();

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Quiz List</h1>
            <button
                onClick={() => navigate('/create-quiz')}
                className="bg-blue-500 text-white px-4 py-2 mb-4"
            >
                Create New Quiz
            </button>
            {quizzes.map(quiz => (
                <QuizItem key={quiz.id} quiz={quiz} />
            ))}
        </div>
    );
};


