// src/pages/Home.tsx
import React, { useState, useEffect } from "react";
import { fetchQuestions } from "../api/api";
import ProgressBar from "../components/ProgressBar";
import QuestionCard from "../components/QuestionCard";
import { useNavigate } from "react-router-dom";

const Questions: React.FC = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string | null }>({});
  const navigate = useNavigate();

  useEffect(() => {
    const loadQuestions = async () => {
      const data = await fetchQuestions();
      setQuestions(data);
    };
    loadQuestions();
  }, []);

  const handleAnswerSelect = (answerKey: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestionIndex]: answerKey,
    }));
  };

  const handleNext = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleBack = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  const handleFinish = () => {
    navigate("/results", { state: { questions, answers } });
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="container mx-auto p-4">
      <ProgressBar progress={progress} />
      {currentQuestion && (
        <QuestionCard
          question={currentQuestion.question}
          answers={currentQuestion.answers}
          selectedAnswer={answers[currentQuestionIndex]}
          onSelectAnswer={handleAnswerSelect}
        />
      )}
      <div className="flex justify-between mt-4">
        {currentQuestionIndex > 0 && (
          <button onClick={handleBack} className="btn btn-secondary">
            Back
          </button>
        )}
        {currentQuestionIndex < questions.length - 1 ? (
          <button onClick={handleNext} className="btn btn-primary">
            Next
          </button>
        ) : (
          <button onClick={handleFinish} className="btn btn-success">
            Finish
          </button>
        )}
      </div>
    </div>
  );
};

export default Questions;
