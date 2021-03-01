import { configureStore } from '@reduxjs/toolkit';

import selectionSlice from './features/SelectionScreen/selectionSlice';
import quizSlice from './features/QuizScreen/quizSlice';
import modalSlice from './features/Modal/modalSlice';

const store = configureStore({
  reducer: {
    selection: selectionSlice,
    quiz: quizSlice,
    modal: modalSlice,
  },
});

export default store;
