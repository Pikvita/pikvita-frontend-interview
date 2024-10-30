import React from "react";

interface QuestionCardProps {
  question: string;
  answers: Record<string, string | null>;
  selectedAnswer: string | null;
  onSelectAnswer: (answerKey: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  answers,
  selectedAnswer,
  onSelectAnswer,
}) => (
  <div className="border p-4 rounded-md shadow-md">
    <h2 className="text-lg font-semibold mb-4">{question}</h2>
    <div className="grid gap-2">
      {Object.entries(answers).map(([key, answer]) => (
        answer && (
          <button
            key={key}
            className={`p-2 border rounded-md ${
              selectedAnswer === key ? "bg-blue-500 text-white" : "bg-gray-200"
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
