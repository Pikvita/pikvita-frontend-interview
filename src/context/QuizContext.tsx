import { createContext, useState, useEffect, ReactNode } from 'react'
import { fetchQuizData } from '../api/quizApi'

// Define the shape of the context data
interface QuizContextType {
  quizQuesData: unknown[]
  loading: boolean
  error: string | null
}

// Create the context with a default value
export const QuizContext = createContext<QuizContextType | undefined>(undefined)

// Create a provider component
export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [quizQuesData, setQuizQuesData] = useState<unknown[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getQuesData = async () => {
      try {
        const data = await fetchQuizData()
        setQuizQuesData(data)
      } catch (err) {
        setError('Failed to fetch quiz ques data')
      } finally {
        setLoading(false)
      }
    }

    getQuesData()
  }, [])

  return (
    <QuizContext.Provider value={{ quizQuesData, loading, error }}>
      {children}
    </QuizContext.Provider>
  )
}