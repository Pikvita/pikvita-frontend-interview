

import React from "react";

interface QuestionCardProps {
  question: string;
  answers: Record<string, string | null>;
  selectedAnswers: string[]; // Change from string | null to string[]
  onSelectAnswer: (answerKey: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  answers,
  selectedAnswers,
  onSelectAnswer,
}) => (
  <div className="border p-7 rounded-md shadow-md bg-amber-50">
    <h2 className="text-lg font-semibold mb-4">{question}</h2>
    <div className="grid gap-3">
      {Object.entries(answers).map(([key, answer]) => (
        answer && (
          <button
            key={key}
            className={`p-2 border rounded-md ${
              selectedAnswers.includes(key) ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => onSelectAnswer(key)}
          >
            {answer}
          </button>
        )
      ))}
    </div>
  </div>
);

export default QuestionCard;
