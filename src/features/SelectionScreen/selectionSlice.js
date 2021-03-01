import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedGroups: [],
  quizOn: false,
};

const selectionSlice = createSlice({
  name: 'selection',
  initialState,
  reducers: {
    addGroup: (state, action) => {
      state.selectedGroups.push(action.payload);
    },
    removeGroup: (state, action) => {
      state.selectedGroups = state.selectedGroups.filter((group) => {
        return group !== action.payload;
      });
    },
    addAll: (state, action) => {
      action.payload.forEach((el) => {
        if (!state.selectedGroups.includes(el)) {
          state.selectedGroups.push(el);
        }
      });
    },
    removeAll: (state, action) => {
      state.selectedGroups = state.selectedGroups.filter((group) => {
        return !action.payload.includes(group);
      });
    },
    quizStart: (state) => {
      state.quizOn = true;
    },
    reset: () => initialState,
  },
});

const { actions, reducer } = selectionSlice;

export const { addGroup, removeGroup, addAll, quizStart, reset } = actions;

export default reducer;
