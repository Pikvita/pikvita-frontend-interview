

import React, { useState, useEffect } from "react";
import { fetchQuestions } from "../api/api";
import ProgressBar from "../components/ProgressBar";
import QuestionCard from "../components/QuestionCard";
import { useNavigate } from "react-router-dom";
import { AuroraBackground } from "../components/ui/aurora-background";
import { motion } from "framer-motion";


//Component Initialization 
const Questions: React.FC = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string[] }>({});
  const navigate = useNavigate();

//Fetching Questions
  useEffect(() => {
    const loadQuestions = async () => {
      const data = await fetchQuestions();
      setQuestions(data);
    };
    loadQuestions();
  }, []);


  //Answer Selection Logic
  const handleAnswerSelect = (answerKey: string) => {
    setAnswers((prevAnswers) => {
      const selectedAnswers = prevAnswers[currentQuestionIndex] || [];
      if (selectedAnswers.includes(answerKey)) {
        // Remove answer if already selected
        return {
          ...prevAnswers,
          [currentQuestionIndex]: selectedAnswers.filter((key) => key !== answerKey),
        };
      } else {
        // Add new answer
        return {
          ...prevAnswers,
          [currentQuestionIndex]: [...selectedAnswers, answerKey],
        };
      }
    });
  };

  //Navigation Functions (Next, Back, Finish)
  const handleNext = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleBack = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  


  //Scoring Logic and Finish Function
  const handleFinish = () => {
    const score = questions.reduce((acc, question, index) => {
      const correctAnswers = question.correctAnswers || []; // Default to empty array if undefined
      const userAnswers = answers[index] || [];
  
      if (
        correctAnswers.every((answer: string) => userAnswers.includes(answer)) &&
        userAnswers.length === correctAnswers.length
      ) {
        return acc + 1;
      }
  
      return acc;
    }, 0);
  
    navigate("/results", { state: { questions, answers, score } });
  };
  
  
  const calculateScore = () => {
    let score = 0;


    // Loop through the questions to calculate the score
    questions.forEach((question, index) => {
      const correctAnswers = question.correctAnswers; // Assume this is an array of correct answers
      const userAnswers = answers[index] || [];
      if (userAnswers.length && userAnswers.every((answer) => correctAnswers.includes(answer))) {
        score++;
      }
    });

    return score;
  };


  //Progress Calculation and Render
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="text-4xl md:text-6xl dark:text-white text-center font-extrabold">
          Test Your Skills & Boost
          <br />
          <span className="bg-gradient-to-r from-pink-500 via-indigo-600 to-blue-500 bg-clip-text text-transparent">
            Your Knowledge
          </span>
        </div>
        <div className="container mx-auto p-4 mt-15">
          <ProgressBar progress={progress} />
          {currentQuestion && (
            <QuestionCard
              question={currentQuestion.question}
              answers={currentQuestion.answers}
              selectedAnswers={answers[currentQuestionIndex] || []}
              onSelectAnswer={handleAnswerSelect}
            />
          )}
          <div className="flex justify-center mt-6 space-x-4 ">
            {currentQuestionIndex > 0 && (
              <button
                onClick={handleBack}
                className="bg-gray-300 text-gray-800 p-3 rounded-md transition-colors hover:bg-gray-400"
              >
                Back
              </button>
            )}
            {currentQuestionIndex < questions.length - 1 ? (
              <button
                onClick={handleNext}
                className="bg-blue-500 text-white p-3 rounded-md transition-colors hover:bg-blue-600"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleFinish}
                className="bg-green-500 text-white p-2 rounded-md transition-colors hover:bg-green-600"
              >
                Finish
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </AuroraBackground>
  );
};

export default Questions;
