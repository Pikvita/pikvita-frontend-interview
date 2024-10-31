

import React from "react";

//QuestionCardProps Interface: Defines the properties required by the component
interface QuestionCardProps {
  question: string;
  answers: Record<string, string | null>;
  selectedAnswers: string[]; // Change from string | null to string[]
  onSelectAnswer: (answerKey: string) => void;
}
//QuestionCard takes in a question and its answers and renders them with styling. Each answer can be selected by clicking on it, which will call the onSelectAnswer function.
const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  answers,
  selectedAnswers,
  onSelectAnswer,
}) => (

  //Main Container
  <div className="border p-7 rounded-md shadow-md bg-amber-50">
    <h2 className="text-lg font-semibold mb-4">{question}</h2>

    {/* A grid layout for organizing answer buttons with spacing between them. */}
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
