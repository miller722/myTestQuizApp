import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteQuiz } from '../store/quizzesSlice';
import { Quiz } from '../store/types';
import { useNavigate } from 'react-router-dom';

interface QuizItemProps {
    quiz: Quiz;
}

const QuizItem: React.FC<QuizItemProps> = ({ quiz }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDelete = () => {
        dispatch(deleteQuiz(quiz.id));
    };

    const handleEdit = () => {
        navigate(`/edit-quiz/${quiz.id}`);
    };

    const handleTakeQuiz = () => {
        navigate(`/take-quiz/${quiz.id}`);
    };

    return (
        <div className="border p-4 mb-4">
            <h2 className="text-xl font-bold">{quiz.title}</h2>
            <button className="bg-blue-500 text-white px-4 py-2 mt-2" onClick={handleTakeQuiz}>
                Take Quiz
            </button>
            <button className="bg-yellow-500 text-white px-4 py-2 mt-2 ml-2" onClick={handleEdit}>
                Edit
            </button>
            <button className="bg-red-500 text-white px-4 py-2 mt-2 ml-2" onClick={handleDelete}>
                Delete
            </button>
        </div>
    );
};

export default QuizItem;
