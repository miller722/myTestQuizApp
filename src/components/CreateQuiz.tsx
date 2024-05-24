import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addQuiz } from '../store/quizzesSlice';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Quiz, Question, Answer } from '../store/types';

const CreateQuiz: React.FC = () => {
    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState<Question[]>([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAddQuestion = () => {
        const newQuestion: Question = {
            id: uuidv4(),
            quizId: '', // This will be set when the quiz is created
            type: 'single', // default type
            title: '',
            score: 0,
            answers: [],
        };
        setQuestions([...questions, newQuestion]);
    };

    const handleQuestionChange = (index: number, updatedQuestion: Question) => {
        const updatedQuestions = questions.map((question, i) => (i === index ? updatedQuestion : question));
        setQuestions(updatedQuestions);
    };

    const handleAddAnswer = (questionIndex: number) => {
        const newAnswer: Answer = {
            id: uuidv4(),
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
        const newQuiz: Quiz = {
            id: uuidv4(),
            title,
            questions: questions.map((q) => ({ ...q, quizId: uuidv4() })),
        };
        dispatch(addQuiz({ title: newQuiz.title, questions: newQuiz.questions }));
        navigate('/');
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Create New Quiz</h1>
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
                        onChange={(e) =>
                            handleQuestionChange(index, { ...question, title: e.target.value })
                        }
                        className="border p-2 mb-2 w-full"
                    />
                    <input
                        type="number"
                        placeholder="Score"
                        value={question.score}
                        onChange={(e) =>
                            handleQuestionChange(index, { ...question, score: Number(e.target.value) })
                        }
                        className="border p-2 mb-2 w-full"
                    />
                    <select
                        value={question.type}
                        onChange={(e) =>
                            handleQuestionChange(index, { ...question, type: e.target.value })
                        }
                        className="border p-2 mb-2 w-full"
                    >
                        <option value="single">Single Choice</option>
                        <option value="multiple">Multiple Choice</option>
                    </select>
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
                    <button
                        onClick={() => handleAddAnswer(index)}
                        className="bg-green-500 text-white px-4 py-2 mt-2"
                    >
                        Add Answer
                    </button>
                </div>
            ))}
            <button onClick={handleAddQuestion} className="bg-blue-500 text-white px-4 py-2 mt-2">
                Add Question
            </button>
            <button onClick={handleSaveQuiz} className="bg-blue-500 text-white px-4 py-2 mt-2 ml-2">
                Save Quiz
            </button>
        </div>
    );
};

export default CreateQuiz;