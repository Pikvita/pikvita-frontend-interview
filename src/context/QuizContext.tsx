import { createContext, useState, useEffect, ReactNode } from 'react'
import { fetchQuizQuestions } from '../api/quizApi'

// Define the shape of the context data
interface QuizContextType {
  questions: unknown[]
  loading: boolean
  error: string | null
}

// Create the context with a default value
export const QuizContext = createContext<QuizContextType | undefined>(undefined)

// Create a provider component
export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [questions, setQuestions] = useState<unknown[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const data = await fetchQuizQuestions()
        setQuestions(data)
      } catch (err) {
        setError('Failed to fetch quiz questions')
      } finally {
        setLoading(false)
      }
    }

    getQuestions()
  }, [])

  return (
    <QuizContext.Provider value={{ questions, loading, error }}>
      {children}
    </QuizContext.Provider>
  )
}