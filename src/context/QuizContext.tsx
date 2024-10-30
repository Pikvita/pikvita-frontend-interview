import { createContext, useState, useEffect, ReactNode } from 'react'
import { fetchQuizData } from '../api/quizApi'

// Define the shape of the context data
interface QuizQuestion {
  id: number;
  question: string;
  correct_answers: { [key: string]: string };
}

interface QuizContextType {
  questions: QuizQuestion[];
  currentQuestion: number;
  setCurrentQuestion: React.Dispatch<React.SetStateAction<number>>;
  userAnswers: { [key: number]: string };
  score: number;
  setUserAnswers: (questionId: number, answer: string) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  calculateScore: () => void;
}

// Create the context with a default value
export const QuizContext = createContext<QuizContextType | undefined>(undefined)

// Create a provider component
export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{[key: number]: string}>({});
  const [score, setScore] = useState(0);

  useEffect(() => {
    const loadQuestions = async () => {
      const data = await fetchQuizData();
      setQuestions(data);
    };
    loadQuestions();
  }, []);

  const handleSetUserAnswers = (questionId: number, answer: string) => {
    setUserAnswers(prev => ({...prev, [questionId]: answer}));
  };

  const calculateScore = () => {
    let newScore = 0;
    questions.forEach(question => {
      const userAnswer = userAnswers[question.id];
      if (userAnswer && question.correct_answers[`${userAnswer}_correct`] === "true") {
        newScore++;
      }
    });
    setScore(newScore);
  };

  const value = {
    questions,
    currentQuestion,
    setCurrentQuestion,
    userAnswers,
    score,
    setUserAnswers: handleSetUserAnswers,
    nextQuestion: () => setCurrentQuestion(prev => Math.min(prev + 1, questions.length - 1)),
    previousQuestion: () => setCurrentQuestion(prev => Math.max(prev - 1, 0)),
    calculateScore
  };

  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  );
};