import React from 'react';
import { useQuiz } from '../context/QuizContext';
import { Question } from '../utils/api'; // Import the Question type
import '../index.css';

// Define the type for answer keys
type AnswerKey = 'answer_a' | 'answer_b' | 'answer_c' | 'answer_d' | 'answer_e' | 'answer_f';

// Define a type for correct answer keys
type CorrectAnswerKey = 'answer_a_correct' | 'answer_b_correct' | 'answer_c_correct' | 'answer_d_correct' | 'answer_e_correct' | 'answer_f_correct';

const ResultsPage: React.FC = () => {
  const { state } = useQuiz();

  // Helper function to get correct answers for a question
  const getCorrectAnswers = (question: Question) => {
    return (Object.keys(question.correct_answers) as CorrectAnswerKey[])
      .filter(key => question.correct_answers[key] === "true")
      .map(key => question.answers[key.replace('_correct', '') as AnswerKey])
      .filter((answer): answer is string => answer !== null); // Filter out null values
  };

  // Calculate the total score based on user answers
  const calculateScore = () => {
    return state.questions.reduce((score, question) => {
      const userAnswers = state.selectedAnswers[question.id] || [];
      const correctAnswers = getCorrectAnswers(question);
      
      // Check if the user's answer matches the correct answers
      const isCorrect = correctAnswers.every(answer => userAnswers.includes(answer));
      return isCorrect ? score + 1 : score;
    }, 0);
  };

  const totalScore = calculateScore(); // Get the calculated score

  return (
    <div className="results-page">
      <h1>Quiz Results</h1>
      <p className="score">
        Your Score: <strong>{totalScore}</strong> out of <strong>{state.questions.length}</strong>
      </p>
      <h2>Review Your Answers:</h2>
      <ul className="results-list">
        {state.questions.map((question) => {
          const userAnswers = state.selectedAnswers[question.id] || [];
          const correctAnswers = getCorrectAnswers(question);

          // Check if the user's answer matches the correct answer
          const isCorrect = correctAnswers.every(answer => userAnswers.includes(answer));

          return (
            <li key={question.id} className={`result-item ${isCorrect ? 'correct' : 'incorrect'}`}>
              <h3>{question.question}</h3>
              <p>
                Your Answers: {userAnswers.length > 0 ? userAnswers.join(', ') : 'No answer selected'}
              </p>
              <p>
                Correct Answers: {correctAnswers.length > 0 ? correctAnswers.join(', ') : 'None'}
              </p>
              {userAnswers.length > 0 && !isCorrect && (
                <p className="feedback">Your answer is incorrect.</p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ResultsPage;
