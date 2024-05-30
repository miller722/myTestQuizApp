import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addQuiz } from '../store/quizzesSlice';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Quiz, Question, Answer } from '../store/types';

export const CreateQuiz: React.FC = () => {
    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState<Question[]>([]);
    const [timeLimit, setTimeLimit] = useState(10);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAddQuestion = () => {
        const newQuestionId = uuidv4();
        const newQuestion: Question = {
            id: newQuestionId,
            quizId: '',
            type: 'single',
            title: '',
            score: 1,
            answers: [],
        };
        setQuestions([...questions, newQuestion]);
    };

    const handleQuestionChange = (questionIndex: number, updatedQuestion: Question) => {
        const updatedQuestions = questions.map((question, i) => (i === questionIndex ? updatedQuestion : question));
        setQuestions(updatedQuestions);
    };

    const handleAddAnswer = (questionIndex: number) => {
        const newAnswer: Answer = {
            id: uuidv4(),
            questionId: questions[questionIndex].id,
            text: '',
            isCorrect: false,
            type: 'text',
        };
        const updatedQuestions = questions.map((question, i) =>
            i === questionIndex ? { ...question, answers: [...question.answers, newAnswer] } : question
        );
        setQuestions(updatedQuestions);
    };

    const handleDeleteAnswer = (questionIndex: number, answerId: string) => {
        const updatedQuestions = questions.map((question, i) =>
            i === questionIndex ? { ...question, answers: question.answers.filter(a => a.id !== answerId) } : question
        );
        setQuestions(updatedQuestions);
    };

    const handleDeleteQuestion = (questionId: string) => {
        setQuestions(questions.filter(question => question.id !== questionId));
    };

    const handleSaveQuiz = () => {
        const newQuizId = uuidv4();
        const newQuiz: Quiz = {
            id: newQuizId,
            title,
            questions: questions.map((q) => ({ ...q, quizId: newQuizId })),
            timeLimit: timeLimit * 60,
        };
        dispatch(addQuiz(newQuiz));
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
            <h3>Time limit:</h3>
            <input
                type="number"
                value={timeLimit}
                onChange={(e) => setTimeLimit(Number(e.target.value))}
                className="border p-2 mb-2 w-full"
            />
            {questions.map((question, questionIndex) => (
                <div key={question.id} className="mb-4 border p-4">
                    <input
                        type="text"
                        placeholder="Question"
                        value={question.title}
                        onChange={(e) =>
                            handleQuestionChange(questionIndex, { ...question, title: e.target.value })
                        }
                        className="border p-2 mb-2 w-full"
                    />
                    <h3>Point:</h3>
                    <input
                        type="number"
                        placeholder="Score"
                        value={question.score}
                        onChange={(e) =>
                            handleQuestionChange(questionIndex, { ...question, score: Number(e.target.value) })
                        }
                        className="border p-2 mb-2 w-full"
                    />

                    <select
                        value={question.type}
                        onChange={(e) =>
                            handleQuestionChange(questionIndex, { ...question, type: e.target.value })
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
                                    handleQuestionChange(questionIndex, { ...question, answers: updatedAnswers });
                                }}
                                className="border p-2 w-full"
                            />
                            {question.type === 'multiple' ? (
                                <input
                                    type="checkbox"
                                    checked={answer.isCorrect}
                                    onChange={(e) => {
                                        const updatedAnswers = question.answers.map((a, i) =>
                                            i === answerIndex ? { ...a, isCorrect: e.target.checked } : a
                                        );
                                        handleQuestionChange(questionIndex, { ...question, answers: updatedAnswers });
                                    }}
                                    className="ml-2"
                                />
                            ) : (
                                <input
                                    type="radio"
                                    name={`question-${question.id}`}
                                    checked={answer.isCorrect}
                                    onChange={() => {
                                        const updatedAnswers = question.answers.map((a, i) =>
                                            ({ ...a, isCorrect: i === answerIndex })
                                        );
                                        handleQuestionChange(questionIndex, { ...question, answers: updatedAnswers });
                                    }}
                                    className="ml-2"
                                />
                            )}
                            <button
                                onClick={() => handleDeleteAnswer(questionIndex, answer.id)}
                                className="bg-red-500 text-white px-4 py-2 mt-2 ml-2"
                            >
                                Delete Answer
                            </button>
                        </div>
                    ))}
                    <button
                        onClick={() => handleAddAnswer(questionIndex)}
                        className="bg-green-500 text-white px-4 py-2 mt-2"
                    >
                        Add Answer
                    </button>
                    <button
                        onClick={() => handleDeleteQuestion(question.id)}
                        className="bg-red-500 text-white px-4 py-2 mt-2 ml-2"
                    >
                        Delete Question
                    </button>
                </div>
            ))}
            <button onClick={handleAddQuestion} className="bg-blue-500 text-white px-4 py-2 mt-2">
                Add Question
            </button>
            <button onClick={handleSaveQuiz} className="bg-green-500 text-white px-4 py-2 mt-2 ml-2">
                Save Quiz
            </button>
        </div>
    );
};

