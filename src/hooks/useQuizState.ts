import { useLocalStorage } from './useLocalStorage'

export type AnswerKey = 'a' | 'b' | 'c' | 'd' | 'e' | 'f'
export type Answers = Record<AnswerKey, string | null>
export type CorrectAnswers = Record<AnswerKey, boolean>
export type MultipleAnswers = Record<AnswerKey, boolean>
export type SingleAnswer = AnswerKey
export type SelectedAnswer = SingleAnswer | undefined
export type SelectedAnswers = SelectedAnswer[]

export interface Quiz {
  id: number
  question: string
  description: string
  answers: Answers
  multiple_correct_answers: boolean
  correct_answer: AnswerKey
  correct_answers: CorrectAnswers
  explanation: string | null
  tip: string | null
  tags: string[]
  category: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
}

export type Quizzes = Quiz[]

export interface QuizState {
  quizzes: Quizzes
  selectedAnswers: SelectedAnswers
  progress: number
  selectedAnswer: SelectedAnswer
}

export const useQuizState = () => {
  const [quizState, setQuizState] = useLocalStorage<QuizState | undefined>('quizzes', undefined)
  return [quizState, setQuizState] as const
}
