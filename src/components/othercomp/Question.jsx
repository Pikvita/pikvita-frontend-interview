import React from 'react';
import { useDispatch } from 'react-redux';
import { selectAnswer, nextQuestion } from '../../redux/quizSlice';

const Question = ({ question }) => {
  const dispatch = useDispatch();

  const handleSelect = (answer) => {
    dispatch(selectAnswer({ questionId: question.id, answer }));
    dispatch(nextQuestion());
  };

  return (
    <div className="question-container">
      <h2>{question.question}</h2>
      <div>
        {Object.entries(question.answers).map(([key, answer]) => (
          answer && (
            <button key={key} onClick={() => handleSelect(key)} className="answer-button">
              {answer}
            </button>
          )
        ))}
      </div>
    </div>
  );
};

export default Question;
