import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { editQuiz } from '../store/quizzesSlice';
import { Quiz, Question, Answer } from '../store/types';
import { v4 as uuidv4 } from 'uuid';

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
            id: uuidv4(), // generate random id
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

    const handleDeleteAnswer = (questionIndex: number, answerId: string) => {
        const updatedQuestions = questions.map((question, i) =>
            i === questionIndex ? { ...question, answers: question.answers.filter(a => a.id !== answerId) } : question
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
            {questions.map((question, questionIndex) => (
                <div key={question.id} className="mb-4 border p-4">
                    <input
                        type="text"
                        placeholder="Question"
                        value={question.title}
                        onChange={(e) => handleQuestionChange(questionIndex, { ...question, title: e.target.value })}
                        className="border p-2 mb-2 w-full"
                    />
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
                            <button
                                onClick={() => handleDeleteAnswer(questionIndex, answer.id)}
                                className="bg-red-500 text-white px-4 py-2 mt-2 ml-2"
                            >
                                Delete Answer
                            </button>
                        </div>
                    ))}
                    <button onClick={() => handleAddAnswer(questionIndex)} className="bg-green-500 text-white px-4 py-2">
                        Add Answer
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

export default EditQuiz;
