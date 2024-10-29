// src/components/UI/QuestionCard.tsx 
import React from 'react';

interface Option {
  key: string;
  answer: string | null;
}

interface QuestionCardProps {
  question: string;
  options: Option[];
  onSelectOption: (selectedAnswers: string[]) => void;
  multiple: boolean;
  selectedAnswers: string[];
  onNext: () => void;
  onPrev: () => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  options,
  onSelectOption,
  multiple,
  selectedAnswers,
  onNext,
  onPrev,
}) => {
  const handleOptionClick = (answer: string | null) => {
    if (!answer) return;

    const newAnswers = multiple
      ? selectedAnswers.includes(answer)
        ? selectedAnswers.filter((a) => a !== answer)
        : [...selectedAnswers, answer]
      : [answer];

    onSelectOption(newAnswers);
  };

  return (
    <div className="question-card">
      <div className="question-text">{question}</div>
      <ul className="options-list">
        {options.map(({ key, answer }) => (
          <li
            key={key}
            className={`option-item ${selectedAnswers.includes(answer || "") ? 'selected' : ''}`}
            onClick={() => handleOptionClick(answer)}
          >
            {answer}
          </li>
        ))}
      </ul>
      <div className="button-container">
        <button className="button" onClick={onPrev}>
          Previous
        </button>
        <button className="button" onClick={onNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;
