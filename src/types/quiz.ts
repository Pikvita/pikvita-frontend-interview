export interface QuizQuestion {
  id: number
  question: string
  answers: {
    [key: string]: string | null
  }
  correct_answers: {
    [key: string]: string
  }
  multiple_correct_answers: string
  correct_answer: string
}
