import { createContext, FC, PropsWithChildren, useEffect, useState } from 'react'
import { AnswerKey, Answers, CorrectAnswers, Quizzes, SelectedAnswer, useQuizState } from '../hooks/useQuizState'
import { notification } from 'antd'

interface Start {
    startQuiz: () => void
}

interface Progress {
    idx: number
    question: string
    answers: Answers
    position: 'last' | 'first' | 'middle'
    selectedAnswer: SelectedAnswer
    submitQuiz: () => void
    previousQuestion: () => void
    nextQuestion: () => void
    skipQuestion: () => void
    setSelectedAnswer: (answerKey: AnswerKey) => void
    totalQuestions: number
}

interface WrongAnswer {
    question: string
    answer: string | undefined
    correctAnswer: string
}

interface Result {
    wrongAnswers: WrongAnswer[]
    percentage: number
}

interface End {
    result: Result
    startQuiz: () => void
}

type Show = {
    "start": Start
    "progress"?: undefined
    "end"?: undefined
} | {
    "progress": Progress
    "start"?: undefined
    "end"?: undefined
} | {
    "end": End
    "start"?: undefined
    "progress"?: undefined
}

interface QuizContextI {
    show: Show
    fetching: boolean

    quizNotification: (
        type: 'info' | 'success' | 'error' | 'warning',
        message?: string,
        description?: string,
    ) => void
}

export const QuizContext = createContext<QuizContextI | undefined>(undefined)

export const QuizProvider: FC<PropsWithChildren> = ({ children }) => {
    const [quizState, setQuizState] = useQuizState()
    const [api, contextHolder] = notification.useNotification()
    const [fetching, setFetching] = useState(false)
    const [result, setResult] = useState<Result>()

    const getQuestionPosition = (progress: number, quizzesLength: number) => {
        if (progress === 0) {
            return 'first'
        } else if (progress === quizzesLength - 1) {
            return 'last'
        } else {
            return 'middle'
        }
    }

    const quizNotification = (
        type: 'info' | 'success' | 'error' | 'warning',
        message?: string,
        description?: string,
    ) => {
        api[type]({
            message,
            description,
            key: 'form-notification',
        })
    }

    const fetchQuiz = async () => {
        try {
            setFetching(true)
            const response = await fetch(
                'https://quizapi.io/api/v1/questions?apiKey=M7RT7dicTsTgRWHPM4LqiwuNuiHK9VmtPIuFZOnY&category=code&difficulty=Easy&limit=10&tags=JavaScript',
            )
            const quizzes: Quizzes = await response.json()
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            quizzes.forEach((quiz: any) => {
                const transformedCorrectAnswers: CorrectAnswers = {} as CorrectAnswers
                for (const key of Object.keys(quiz.correct_answers) as string[]) {
                    const baseKey = key.replace('_correct', '').replace('answer_', '') as AnswerKey // Remove 'answer' prefix and '_correct' suffix
                    transformedCorrectAnswers[baseKey] = quiz.correct_answers[key] === "true"
                }
                quiz.correct_answers = transformedCorrectAnswers // Assign the transformed correct answers
            })
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            quizzes.forEach((quiz: any) => {
                const transformedAnswers: Answers = {} as Answers
                for (const key of Object.keys(quiz.answers) as string[]) {
                    const baseKey = key.replace('answer_', '') as AnswerKey // Remove 'answer_' suffix
                    transformedAnswers[baseKey] = quiz.answers[key]
                }
                quiz.answers = transformedAnswers // Assign the transformed answers
            })
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            quizzes.forEach((quiz: any) => {
                quiz.correct_answer = quiz.correct_answer.replace('answer_', '')
                quiz.multiple_correct_answers = quiz.multiple_correct_answers === "true"
            })
            setQuizState({ quizzes, selectedAnswers: Array.from({ length: quizzes.length }, () => undefined), progress: 0, selectedAnswer: undefined })
        }
        catch (error) {
            quizNotification('error', 'Something went wrong', 'Please try again')
        } finally {
            setFetching(false)
        }
    }

    const startQuiz = () => {
        setQuizState({ progress: 0, selectedAnswers: Array.from({ length: 10 }, () => undefined), selectedAnswer: undefined, quizzes: [] })
        setResult(undefined)
        fetchQuiz()
    }

    const submitQuiz = () => {
        if (quizState === undefined) {
            return
        }
        quizState.selectedAnswers[quizState.progress] = quizState.selectedAnswer
        const wrongAnswers: WrongAnswer[] = []
        for (let i = 0; i < quizState.quizzes.length; i++) {
            const selectedAnswer = quizState.selectedAnswers[i]
            if (selectedAnswer === undefined || (selectedAnswer !== undefined && !quizState.quizzes[i].correct_answers[selectedAnswer])) {
                const correctAnswer = Object.entries(quizState.quizzes[i].correct_answers).filter(entry => entry[1] === true).map((entry) => {
                    return quizState.quizzes[i].answers[entry[0] as AnswerKey]
                }).join(', ')
                wrongAnswers.push({ question: quizState.quizzes[i].question, answer: selectedAnswer ? quizState.quizzes[i].answers[selectedAnswer] || undefined : undefined, correctAnswer })
            }
        }
        const percentage = ((quizState.quizzes.length - wrongAnswers.length) / quizState.quizzes.length) * 100
        setResult({ wrongAnswers, percentage })
        setQuizState(undefined)
    }

    const nextQuestion = () => {
        if (quizState === undefined) {
            return
        }
        if (quizState.selectedAnswer === undefined) {
            quizNotification('error', 'Please select an answer or skip')
            return
        }
        const nextProgress = quizState.progress + 1
        if (nextProgress >= quizState.quizzes.length) {
            return
        }
        const selectedAnswers = [...quizState.selectedAnswers]
        selectedAnswers[quizState.progress] = quizState.selectedAnswer
        setQuizState((prev) => (prev && { ...prev, progress: nextProgress, selectedAnswers, selectedAnswer: quizState.selectedAnswers[nextProgress] }))
    }

    const skipQuestion = () => {
        if (quizState === undefined) {
            return
        }
        const nextProgress = quizState.progress + 1
        if (nextProgress >= quizState.quizzes.length) {
            return
        }
        const selectedAnswers = [...quizState.selectedAnswers]
        selectedAnswers[quizState.progress] = undefined
        setQuizState((prev) => (prev && { ...prev, progress: nextProgress, selectedAnswers, selectedAnswer: quizState.selectedAnswers[nextProgress] }))
    }

    const previousQuestion = () => {
        if (quizState === undefined) {
            return
        }
        const nextProgress = quizState.progress - 1
        if (nextProgress < 0) {
            return
        }
        setQuizState((prev) => (prev && { ...prev, progress: nextProgress, selectedAnswer: quizState.selectedAnswers[nextProgress] }))
    }

    const setSelectedAnswer = (answerKey: AnswerKey) => {
        if (quizState === undefined) {
            return
        }
        setQuizState((prev) => (prev && { ...prev, selectedAnswer: answerKey }))
    }

    const getShow = (): Show => {
        if (result !== undefined) {
            return { end: { result, startQuiz } }
        }
        if (quizState === undefined) {
            return { start: { startQuiz } }
        }
        else {
            const progress = quizState.progress
            if (fetching) {
                return {
                    progress: {
                        idx: progress,
                        answers: { a: null, b: null, c: null, d: null, e: null, f: null },
                        position: getQuestionPosition(progress, quizState.quizzes.length),
                        question: '',
                        selectedAnswer: undefined,
                        totalQuestions: 0,
                        nextQuestion,
                        previousQuestion,
                        skipQuestion,
                        submitQuiz,
                        setSelectedAnswer
                    }
                }
            }
            return {
                progress: {
                    idx: progress,
                    answers: quizState.quizzes[progress].answers,
                    position: getQuestionPosition(progress, quizState.quizzes.length),
                    question: quizState.quizzes[progress].question,
                    selectedAnswer: quizState.selectedAnswer,
                    totalQuestions: quizState.quizzes.length,
                    nextQuestion,
                    previousQuestion,
                    skipQuestion,
                    submitQuiz,
                    setSelectedAnswer,
                }
            }
        }
    }

    useEffect(() => {
        api.destroy('form-notification')
    })

    return (
        <QuizContext.Provider value={{
            fetching,
            quizNotification,
            show: getShow(),
        }}>
            {contextHolder}
            {children}
        </QuizContext.Provider >
    )
}
