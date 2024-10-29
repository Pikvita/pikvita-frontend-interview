// src/pages/QuizPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionCard from '../components/UI/QuestionCard';
import ProgressBar from '../components/UI/Progress_Bar';
import { useQuiz } from '../context/QuizContext';

const QuizPage: React.FC = () => {
  const { state, dispatch } = useQuiz();
  const navigate = useNavigate();
  const currentQuestion = state.questions[state.currentQuestionIndex];

  const handleSelectOption = (selectedAnswers: string[]) => {
    dispatch({
      type: 'SELECT_ANSWER',
      payload: {
        questionId: currentQuestion.id,
        answer: selectedAnswers,
      },
    });
  };

  const handleNextQuestion = () => {
    if (state.currentQuestionIndex < state.questions.length - 1) {
      dispatch({ type: 'NEXT_QUESTION' });
    } else {
      dispatch({ type: 'CALCULATE_SCORE' });
      navigate('/results');
    }
  };

  const handlePrevQuestion = () => {
    if (state.currentQuestionIndex > 0) {
      dispatch({ type: 'PREV_QUESTION' });
    }
  };

  return (
    <div className="quiz-container">
      <ProgressBar 
        current={state.currentQuestionIndex + 1} 
        total={state.questions.length} 
      />

      {currentQuestion && (
        <QuestionCard
          question={currentQuestion.question}
          options={Object.entries(currentQuestion.answers)
            .map(([key, value]) => ({ key, answer: value }))
            .filter(option => option.answer !== null)}
          onSelectOption={handleSelectOption}
          multiple={currentQuestion.multiple_correct_answers === "true"}
          selectedAnswers={state.selectedAnswers[currentQuestion.id] || []}
          onNext={handleNextQuestion}
          onPrev={handlePrevQuestion}
        />
      )}
    </div>
  );
};

export default QuizPage;
