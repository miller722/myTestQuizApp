import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Quiz, Question, Answer } from '../store/types';

const TakeQuiz: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const quizzes = useSelector((state: RootState) => state.quizzes.quizzes);
    const currentQuiz: Quiz | undefined = quizzes.find(quiz => quiz.id === id);
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNextQuestion = () => {
        setCurrentIndex(prevIndex => prevIndex + 1);
    };

    const handleAnswerSelect = (answer: Answer) => {
        setAnswers(prevAnswers => [...prevAnswers, answer]);
    };

    const calculateScore = () => {
        let score = 0;
        answers.forEach(answer => {
            const question = currentQuiz?.questions.find(q => q.id === answer.questionId);
            if (question && question.answers.some(a => a.isCorrect && a.id === answer.id)) {
                score += 1;
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

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Take Quiz</h1>
            <h2 className="text-xl font-bold mb-2">{currentQuestion.title}</h2>
            <div>
                {currentQuestion.answers.map(answer => (
                    <div key={answer.id} className="mb-2">
                        <input
                            type="radio"
                            id={answer.id}
                            name="answer"
                            value={answer.id}
                            onChange={() => handleAnswerSelect(answer)}
                        />
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

export default TakeQuiz;
