import { createSlice } from '@reduxjs/toolkit';

const quizSlice = createSlice({
  name: 'quiz',
  initialState: {
    questions: [],
    currentQuestionIndex: 0,
    selectedAnswers: {},
    score: 0,
  },
  reducers: {
    setQuestions(state, action) {
      state.questions = action.payload;
    },
    selectAnswer(state, action) {
      const { questionId, answer } = action.payload;
      state.selectedAnswers[questionId] = answer;
    },
    nextQuestion(state) {
      state.currentQuestionIndex += 1;
    },
    calculateScore(state) {
      let score = 0;
      state.questions.forEach((question) => {
        const correctAnswer = question.correct_answer;
        const selectedAnswer = state.selectedAnswers[question.id];
        if (selectedAnswer === correctAnswer) {
          score++;
        }
      });
      state.score = score;
    },
    resetQuiz(state) {
      state.currentQuestionIndex = 0;
      state.selectedAnswers = {};
      state.score = 0;
    },
  },
});

export const { setQuestions, selectAnswer, nextQuestion, calculateScore, resetQuiz } = quizSlice.actions;

export default quizSlice.reducer;
