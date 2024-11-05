import React, { useState, useEffect } from 'react'
import { Button, Radio, Space, Progress, Typography, message } from 'antd'
import axios from 'axios'
import { useLocalStorage } from '../../hooks/useLocalStorage'

const { Title, Paragraph } = Typography

interface Question {
  id: number
  question: string
  answers: Record<string, string | null>
  correct_answers: Record<string, string>
  correct_answer: string | null
  explanation: string | null
  tip: string | null
  tags: string[]
  category: string
  difficulty: string
}

export default function Quiz() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useLocalStorage<number>(
    'currentQuestionIndex',
    0,
  )
  const [answers, setAnswers] = useLocalStorage<Record<number, string>>('quizAnswers', {})
  const [isQuizCompleted, setIsQuizCompleted] = useState(false)
  const [score, setScore] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `https://quizapi.io/api/v1/questions?apiKey=${
            import.meta.env.VITE_MY_API_KEY
          }&category=code&difficulty=Easy&limit=10&tags=JavaScript`,
        )
        setQuestions(response.data)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching questions:', error)
        message.error('Failed to load questions. Please try again later.')
        setIsLoading(false)
      }
    }

    fetchQuestions()
  }, [])

  const handleAnswer = (selectedOption: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: selectedOption,
    }))
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      calculateScore()
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const calculateScore = () => {
    let totalScore = 0
    questions.forEach((question, index) => {
      const userAnswer = answers[index]
      const correctAnswer = Object.keys(question.correct_answers).find(
        (key) => question.correct_answers[key] === 'true',
      )
      if (userAnswer === correctAnswer?.replace('_correct', '')) {
        totalScore += 1
      }
    })
    setScore((totalScore / questions.length) * 100)
    setIsQuizCompleted(true)
  }

  const handleRestart = () => {
    setCurrentQuestionIndex(0)
    setAnswers({})
    setIsQuizCompleted(false)
    setScore(0)
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading questions...</div>
  }

  if (isQuizCompleted) {
    return (
      <div className="text-center p-8">
        <Title level={2}>Quiz Completed!</Title>
        <Paragraph className="text-xl mb-4">Your score: {score.toFixed(2)}%</Paragraph>
        <Progress type="circle" percent={score} />
        <div className="mt-8">
          <Button type="primary" onClick={handleRestart}>
            Restart Quiz
          </Button>
        </div>
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]

  return (
    <div className="max-w-2xl mx-auto p-8">
      <Progress percent={((currentQuestionIndex + 1) / questions.length) * 100} className="mb-8" />
      <Title level={4}>Question {currentQuestionIndex + 1}</Title>
      {currentQuestion && (
        <>
          <Paragraph className="text-lg mb-4">{currentQuestion.question}</Paragraph>
          <Radio.Group
            onChange={(e) => handleAnswer(e.target.value)}
            value={answers[currentQuestionIndex]}
            className="w-full"
          >
            <Space direction="vertical" className="w-full">
              {Object.entries(currentQuestion.answers)
                .filter(([_, value]) => value !== null)
                .map(([key, value]) => (
                  <Radio
                    key={key}
                    value={key}
                    className="w-full py-2 px-4 border rounded hover:bg-gray-100"
                  >
                    {value}
                  </Radio>
                ))}
            </Space>
          </Radio.Group>
        </>
      )}
      <div className="flex justify-between mt-8">
        <Button onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
          Previous
        </Button>
        <Button type="primary" onClick={handleNext}>
          {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </div>
    </div>
  )
}
