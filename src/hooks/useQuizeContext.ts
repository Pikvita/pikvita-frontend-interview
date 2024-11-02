import { useContext } from 'react'
import { QuizContext } from '../providers/QuizProvider'

export const useQuizContext = () => {
  const quizState = useContext(QuizContext)
  if (quizState === undefined) {
    throw new Error('useQuizContext must be used within a QuizProvider')
  }
  return quizState
}
