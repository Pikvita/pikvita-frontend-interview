import axios from 'axios'

const baseUrl = import.meta.env.VITE_QUIZ_BASEURL
const apiKey = import.meta.env.VITE_QUIZ_API_KEY

export const fetchQuizData = async () => {
  try {
    const response = await axios.get(`${baseUrl}/questions`, {
      params: {
        apiKey,
        category: 'code',
        difficulty: 'Easy',
        limit: 10,
        tags: 'JavaScript',
      },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching quiz questions:', error)
    throw error
  }
}
