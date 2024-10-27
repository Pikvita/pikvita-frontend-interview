import { createSlice } from '@reduxjs/toolkit';
import questionsData from '../data/question.json';

const initialState = {
  questions: [],
  currentQuestionIndex: 0,
  selectedAnswers: {},
  isSubmitted: false,
  score: 0,
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setQuestions(state) {
      state.questions = questionsData;
      
    },
    selectAnswer(state, action) {
      const { questionId, answerId } = action.payload;
      state.selectedAnswers[questionId] = answerId;
      
    },
    navigateQuestion(state, action) {
      state.currentQuestionIndex = action.payload;
    },
    submitQuiz(state) {
      let score = 0;
      state.questions.forEach(question => {
        if (state.selectedAnswers[question.id] === question.correct_answer) {
          score += 1;
        }
        
      });
      state.isSubmitted = true;
      state.score = score;
    },
  },
});

export const { setQuestions, selectAnswer, navigateQuestion, submitQuiz } = quizSlice.actions;
export default quizSlice.reducer;
