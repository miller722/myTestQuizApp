import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { editQuiz } from '../store/quizzesSlice';
import { Quiz, Question, Answer } from '../store/types';

const EditQuiz: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState<Question[]>([]);
    const quizzes = useSelector((state: RootState) => state.quizzes.quizzes);
    const currentQuiz: Quiz | undefined = quizzes.find(quiz => quiz.id === id);

    useEffect(() => {
        if (currentQuiz) {
            setTitle(currentQuiz.title);
            setQuestions(currentQuiz.questions);
        }
    }, [currentQuiz]);

    const handleQuestionChange = (index: number, updatedQuestion: Question) => {
        const updatedQuestions = questions.map((question, i) => (i === index ? updatedQuestion : question));
        setQuestions(updatedQuestions);
    };

    const handleAddAnswer = (questionIndex: number) => {
        const newAnswer: Answer = {
            id: Math.random().toString(36).substr(2, 9), // generate random id
            questionId: questions[questionIndex].id,
            text: '',
            isCorrect: false,
            type: 'text', // default type
        };
        const updatedQuestions = questions.map((question, i) =>
            i === questionIndex ? { ...question, answers: [...question.answers, newAnswer] } : question
        );
        setQuestions(updatedQuestions);
    };

    const handleSaveQuiz = () => {
        if (currentQuiz) {
            dispatch(editQuiz({ id: currentQuiz.id, title, questions }));
            navigate('/');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Edit Quiz</h1>
            <input
                type="text"
                placeholder="Quiz Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border p-2 mb-4 w-full"
            />
            {questions.map((question, index) => (
                <div key={question.id} className="mb-4 border p-4">
                    <input
                        type="text"
                        placeholder="Question"
                        value={question.title}
                        onChange={(e) => handleQuestionChange(index, { ...question, title: e.target.value })}
                        className="border p-2 mb-2 w-full"
                    />
                    {question.answers.map((answer, answerIndex) => (
                        <div key={answer.id} className="mb-2 flex items-center">
                            <input
                                type="text"
                                placeholder="Answer"
                                value={answer.text}
                                onChange={(e) => {
                                    const updatedAnswers = question.answers.map((a, i) =>
                                        i === answerIndex ? { ...a, text: e.target.value } : a
                                    );
                                    handleQuestionChange(index, { ...question, answers: updatedAnswers });
                                }}
                                className="border p-2 w-full"
                            />
                            <input
                                type="checkbox"
                                checked={answer.isCorrect}
                                onChange={(e) => {
                                    const updatedAnswers = question.answers.map((a, i) =>
                                        i === answerIndex ? { ...a, isCorrect: e.target.checked } : a
                                    );
                                    handleQuestionChange(index, { ...question, answers: updatedAnswers });
                                }}
                                className="ml-2"
                            />
                        </div>
                    ))}
                    <button onClick={() => handleAddAnswer(index)} className="bg-green-500 text-white px-4 py-2">
                        Add Answer
                    </button>
                </div>
            ))}
            <button onClick={handleSaveQuiz} className="bg-blue-500 text-white px-4 py-2 mt-2">
                Save Quiz
            </button>
        </div>
    );
};

export default EditQuiz;