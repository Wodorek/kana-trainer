import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  questionsTotal: 0,
  questionsCorrect: 0,
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
    reset: () => initialState,
  },
});

const { actions, reducer } = quizSlice;

export const { setTotalQuestions, questionCorrect } = actions;

export default reducer;