import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const ViewResults: React.FC = () => {
    const { id } = useParams();
    const location = useLocation();
    const score = location.state && (location.state as any).score;

    const quiz = useSelector((state: RootState) => state.quizzes.quizzes.find(quiz => quiz.id === id));

    const quizTitle = quiz ? quiz.title : `Quiz ${id}`;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Quiz Results</h1>
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <p className="text-lg mb-4 border-b pb-4">Quiz name "{quizTitle}"</p>
                <p className="mb-4 border-b pb-4">Your score: {score}</p>
            </div>
        </div>
    );
};

export default ViewResults;
