import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  display: false,
  heading: 'Something went wrong',
  message: 'Something went wrong, please try again',
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setHeading: (state, action) => {
      state.heading = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    displayModal: (state) => {
      state.display = true;
    },
    closeModal: (state) => {
      state.display = false;
    },
    resetModal: () => initialState,
  },
});

const { actions, reducer } = modalSlice;

export const {
  setHeading,
  setMessage,
  resetModal,
  displayModal,
  closeModal,
} = actions;

export default reducer;
