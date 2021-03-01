import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  show: false,
  heading: 'Something went Wrong',
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
    show: (state) => {
      state.show = true;
    },
    close: (state) => {
      state.show = false;
    },
    reset: () => initialState,
  },
});

const { actions, reducer } = modalSlice;

export const { setHeading, setMessage, reset, show, close } = actions;

export default reducer;
