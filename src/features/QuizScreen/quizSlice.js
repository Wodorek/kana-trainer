import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  questionsTotal: 0,
  questionsCorrect: 0,
  questionsCompleted: 0,
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setTotalQuestions: (state, action) => {
      state.questionsTotal = action.payload;
    },
    questionCorrect: (state) => {
      state.questionsCorrect += 1;
    },
    completeQuestion: (state) => {
      state.questionsCompleted += 1;
    },
    restart: (state) => {
      state.questionsCorrect = 0;
      state.questionsCompleted = 0;
    },
    reset: () => initialState,
  },
});

const { actions, reducer } = quizSlice;

export const {
  setTotalQuestions,
  questionCorrect,
  restart,
  completeQuestion,
} = actions;

export default reducer;
