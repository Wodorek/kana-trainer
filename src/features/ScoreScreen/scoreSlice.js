import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  completedQuestions: [],
};

const scoreSlice = createSlice({
  name: 'score',
  initialState,
  reducers: {
    saveToScore: (state, action) => {
      const idx = state.completedQuestions.findIndex((el) => {
        return el[0] === action.payload.parentGroup;
      });

      if (idx === -1) {
        state.completedQuestions.push([
          action.payload.parentGroup,
          [[action.payload.name, action.payload.isCorrect]],
        ]);
      } else {
        state.completedQuestions[idx][1].push([
          action.payload.name,
          action.payload.isCorrect,
        ]);
      }
    },
    resetScore: () => initialState,
  },
});

const { actions, reducer } = scoreSlice;

export const { saveToScore, resetScore } = actions;

export default reducer;
