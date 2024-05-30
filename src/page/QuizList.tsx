
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { QuizItem } from '../components/QuizItem';
import { useNavigate } from 'react-router-dom';

export const QuizList: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const quizzes = useSelector((state: RootState) => state.quizzes.quizzes);
    const navigate = useNavigate();

    const filteredQuizzes = quizzes.filter(quiz =>
        quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Quiz List</h1>
            <button
                onClick={() => navigate('/create-quiz')}
                className="bg-blue-500 text-white px-4 py-2 mb-4"
            >
                Create New Quiz
            </button>
            <input
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="border p-2 mb-4 w-full"
            />
            {filteredQuizzes.map(quiz => (
                <QuizItem key={quiz.id} quiz={quiz} />
            ))}
        </div>
    );
};


