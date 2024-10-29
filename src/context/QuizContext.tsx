// src/context/QuizContext.tsx
import React, { createContext, useReducer, useContext, useEffect, ReactNode } from 'react';
import { fetchQuizData, Question } from '../utils/api';

interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  selectedAnswers: Record<string, string[]>;
  score: number;
}

interface QuizContextProps {
  state: QuizState;
  dispatch: React.Dispatch<QuizAction>;
}

const initialState: QuizState = {
  questions: [],
  currentQuestionIndex: 0,
  selectedAnswers: {},
  score: 0,
};

interface QuizAction {
  type: 'SET_QUESTIONS' | 'SELECT_ANSWER' | 'NEXT_QUESTION' | 'PREV_QUESTION' | 'CALCULATE_SCORE' | 'RESET_QUIZ';
  payload?: any;
}

type AnswerKey = 'answer_a' | 'answer_b' | 'answer_c' | 'answer_d' | 'answer_e' | 'answer_f';

const answerKeys: AnswerKey[] = ['answer_a', 'answer_b', 'answer_c', 'answer_d', 'answer_e', 'answer_f'];

const quizReducer = (state: QuizState, action: QuizAction): QuizState => {
  switch (action.type) {
    case 'SET_QUESTIONS':
      return { ...state, questions: action.payload };

      case 'SELECT_ANSWER':
        return {
          ...state,
          selectedAnswers: {
            ...state.selectedAnswers,
            [action.payload.questionId]: action.payload.answer,
          },
        };
  
    case 'NEXT_QUESTION':
      return {
        ...state,
        currentQuestionIndex: Math.min(state.currentQuestionIndex + 1, state.questions.length - 1),
      };

    case 'PREV_QUESTION':
      return {
        ...state,
        currentQuestionIndex: Math.max(state.currentQuestionIndex - 1, 0),
      };

    case 'CALCULATE_SCORE':
      const score = state.questions.reduce((acc, question) => {
        const correctAnswers = answerKeys
          .filter((key) => question.correct_answers[key as keyof typeof question.correct_answers] === "true")
          .map((key) => question.answers[key as keyof typeof question.answers]);
        const userAnswers = state.selectedAnswers[question.id] || [];
        const isCorrect = correctAnswers.every((answer) => userAnswers.includes(answer as string));
        return isCorrect ? acc + 1 : acc;
      }, 0);

      return { ...state, score };

    case 'RESET_QUIZ':
      return initialState;

    default:
      return state;
  }
};

const QuizContext = createContext<QuizContextProps | undefined>(undefined);

export const QuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  useEffect(() => {
    const loadQuestions = async () => {
      const questions = await fetchQuizData();
      dispatch({ type: 'SET_QUESTIONS', payload: questions });
    };
    loadQuestions();
  }, []);

  return <QuizContext.Provider value={{ state, dispatch }}>{children}</QuizContext.Provider>;
};

export const useQuiz = (): QuizContextProps => {
  const context = useContext(QuizContext);
  if (!context) throw new Error("useQuiz must be used within a QuizProvider");
  return context;
};
