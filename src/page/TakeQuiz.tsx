import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Quiz, Question, Answer } from '../store/types';

export const TakeQuiz: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const quizzes = useSelector((state: RootState) => state.quizzes.quizzes);
    const currentQuiz: Quiz | undefined = quizzes.find(quiz => quiz.id === id);
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(currentQuiz ? currentQuiz.timeLimit : 600); // Set initial time based on the quiz's time limit

    useEffect(() => {
        if (!currentQuiz) {
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    handleFinishQuiz(); // Finish the quiz when time is up
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [currentQuiz]);

    const handleNextQuestion = () => {
        setCurrentIndex(prevIndex => prevIndex + 1);
    };

    const handleAnswerSelect = (answer: Answer) => {
        const currentQuestion = currentQuiz?.questions[currentIndex];

        if (currentQuestion?.type === 'multiple') {
            setAnswers(prevAnswers => {
                if (prevAnswers.some(a => a.id === answer.id)) {
                    return prevAnswers.filter(a => a.id !== answer.id);
                } else {
                    return [...prevAnswers, answer];
                }
            });
        } else {
            setAnswers(prevAnswers => {
                const filteredAnswers = prevAnswers.filter(a => a.questionId !== answer.questionId);
                return [...filteredAnswers, answer];
            });
        }
    };

    const calculateScore = () => {
        let score = 0;
        answers.forEach(answer => {
            const question = currentQuiz?.questions.find(q => q.id === answer.questionId);
            if (question && question.answers.some(a => a.isCorrect && a.id === answer.id)) {
                score += question.score;
            }
        });
        return score;
    };

    const handleFinishQuiz = () => {
        const score = calculateScore();
        navigate(`/results/${id}`, { state: { score } });
    };

    if (!currentQuiz) {
        return <div>Quiz not found</div>;
    }

    const currentQuestion: Question | undefined = currentQuiz.questions[currentIndex];

    if (!currentQuestion) {
        return <div>No more questions</div>;
    }

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Take Quiz</h1>
            <div className="mb-4">
                <span className="font-bold">Time Left: </span>{formatTime(timeLeft)}
            </div>
            <h2 className="text-xl font-bold mb-2">{currentQuestion.title}</h2>
            <div>
                {currentQuestion.answers.map(answer => (
                    <div key={answer.id} className="mb-2">
                        {currentQuestion.type === 'multiple' ? (
                            <input
                                type="checkbox"
                                id={answer.id}
                                name={`answer-${currentQuestion.id}`}
                                value={answer.id}
                                checked={answers.some(a => a.id === answer.id)}
                                onChange={() => handleAnswerSelect(answer)}
                            />
                        ) : (
                            <input
                                type="radio"
                                id={answer.id}
                                name={`answer-${currentQuestion.id}`}
                                value={answer.id}
                                checked={answers.some(a => a.id === answer.id)}
                                onChange={() => handleAnswerSelect(answer)}
                            />
                        )}
                        <label htmlFor={answer.id} className="ml-2">{answer.text}</label>
                    </div>
                ))}
            </div>
            <div className="mt-4">
                {currentIndex < currentQuiz.questions.length - 1 ? (
                    <button onClick={handleNextQuestion} className="bg-blue-500 text-white px-4 py-2 mt-4">
                        Next
                    </button>
                ) : (
                    <button onClick={handleFinishQuiz} className="bg-green-500 text-white px-4 py-2 mt-4">
                        Finish Quiz
                    </button>
                )}
            </div>
        </div>
    );
};
