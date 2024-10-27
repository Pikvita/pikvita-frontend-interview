import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAnswer } from '../store/quizSlice';
import { Button, Progress } from 'antd';

const Question = () => {
  const dispatch = useDispatch();
  const { questions, currentQuestionIndex, selectedAnswers, isSubmitted } = useSelector((state) => state.quiz);
  const question = questions[currentQuestionIndex];

  if (!question) return <p className="text-center text-gray-500">No question available.</p>;

  const handleOptionClick = (answerId) => {
    if (!isSubmitted) {
      dispatch(selectAnswer({ questionId: question.id, answerId }));
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto bg-gradient-to-r from-blue-50 to-blue-100 shadow-xl rounded-lg border border-gray-300 mt-10">
      <Progress
        percent={((currentQuestionIndex + 1) / questions.length) * 100}
        className="mb-8"
        strokeColor="#3b82f6" 
      />
      <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">{question.question}</h2>
      <div className="space-y-4">
        {Object.keys(question.answers).map((key) => (
          <Button
            key={key}
            type={selectedAnswers[question.id] === key ? 'primary' : 'default'}
            onClick={() => handleOptionClick(key)}
            disabled={isSubmitted}
            className={`w-full text-left p-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 ${
              selectedAnswers[question.id] === key
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-blue-50'
            }`}
          >
            {question.answers[key]}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Question;
