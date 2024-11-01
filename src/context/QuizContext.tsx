// src/context/QuizContext.tsx

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define types for question and context properties
type AnswerOptions = {
  answer_a: string | null;
  answer_b: string | null;
  answer_c: string | null;
  answer_d: string | null;
  answer_e?: string | null;
  answer_f?: string | null;
};

type QuestionType = {
  id: number;
  question: string;
  answers: AnswerOptions;
  correct_answer: string;
};

type SelectedAnswersType = Record<number, string[]>;

type QuizContextType = {
  questions: QuestionType[];
  score: number;
  currentQuestion: number;
  setScore: (score: number) => void;
  setCurrentQuestion: (index: number) => void;
  setUserAnswer: (index: number, answer: string) => void;
  selectedAnswers: SelectedAnswersType;
  setSelectedAnswers: React.Dispatch<React.SetStateAction<SelectedAnswersType>>;
  loading: boolean;
  error: string | null;
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswersType>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          'https://quizapi.io/api/v1/questions?apiKey=M7RT7dicTsTgRWHPM4LqiwuNuiHK9VmtPIuFZOnY&category=code&difficulty=Easy&limit=10&tags=JavaScript'
        );
        if (!response.ok) throw new Error('Failed to fetch questions');
        const data: QuestionType[] = await response.json();
        setQuestions(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  const setUserAnswer = (index: number, answer: string) => {
    setSelectedAnswers((prevAnswers) => {
      const currentAnswers = prevAnswers[index] || [];
      const updatedAnswers = currentAnswers.includes(answer)
        ? currentAnswers.filter((ans) => ans !== answer) // Toggle off
        : [...currentAnswers, answer]; // Toggle on

      return {
        ...prevAnswers,
        [index]: updatedAnswers,
      };
    });

    // Check if the answer is correct and update the score accordingly
    if (questions[index].correct_answer === answer) {
      setScore((prevScore) => prevScore + 1);
    }
};


  const value: QuizContextType = {
    questions,
    score,
    currentQuestion,
    setScore,
    setCurrentQuestion,
    setUserAnswer,
    selectedAnswers,
    setSelectedAnswers,
    loading,
    error,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};

// Custom hook for using the quiz context
export const useQuiz = (): QuizContextType => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};
