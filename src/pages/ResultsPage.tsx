// src/pages/ResultsPage.tsx
import React from 'react';
import { useQuiz } from '../context/QuizContext';
import '../index.css';

const ResultsPage: React.FC = () => {
  const { state } = useQuiz();

  return (
    <div className="results-page">
      <h1>Quiz Results</h1>
      <p className="score">
        Your Score: <strong>{state.score}</strong> out of <strong>{state.questions.length}</strong>
      </p>
      <h2>Review Your Answers:</h2>
      <ul className="results-list">
        {state.questions.map((question) => {
          const userAnswers = state.selectedAnswers[question.id] || [];
          return (
            <li key={question.id} className="result-item">
              <h3>{question.question}</h3>
              <p>
                Your Answers: {userAnswers.length > 0 ? userAnswers.join(', ') : 'No answer selected'}
              </p>
              <p>
                Correct Answers: {userAnswers.length > 0 ? userAnswers.join(', ') : 'None'}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ResultsPage;
