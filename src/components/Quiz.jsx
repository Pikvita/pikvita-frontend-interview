import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setQuestions, calculateScore } from '../redux/quizSlice';
import Question from './Question';
import ProgressBar from './ProgressBar';
import Score from './Score';

const Quiz = () => {
  const dispatch = useDispatch();
  const { questions, currentQuestionIndex, score } = useSelector((state) => state.quiz);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch('https://quizapi.io/api/v1/questions?apiKey=M7RT7dicTsTgRWHPM4LqiwuNuiHK9VmtPIuFZOnY&category=code&difficulty=Easy&limit=10');
      const data = await response.json();
      dispatch(setQuestions(data));
    };
    fetchQuestions();
  }, [dispatch]);

  const handleFinish = () => {
    dispatch(calculateScore());
  };

  return (
    <div className="quiz-container">
      <ProgressBar currentQuestionIndex={currentQuestionIndex} totalQuestions={questions.length} />
      {currentQuestionIndex < questions.length ? (
        <Question question={questions[currentQuestionIndex]} />
      ) : (
        <Score score={score} />
      )}
      <button onClick={handleFinish} className="finish-button">Finish Quiz</button>
    </div>
  );
};

export default Quiz;
