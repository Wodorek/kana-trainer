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
      const fullGroups = action.payload.filter((group) => {
        return !state.selectedGroups.includes(group);
      });
      return (state = fullGroups);
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

export const { addGroup, removeGroup, addAll, quizStart } = actions;

export default reducer;
