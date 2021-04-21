import { configureStore } from '@reduxjs/toolkit';

import selectionSlice from './features/SelectionScreen/selectionSlice';
import quizSlice from './features/QuizScreen/quizSlice';
import modalSlice from './features/Modal/modalSlice';
import scoreSlice from './features/ScoreScreen/scoreSlice';

const store = configureStore({
  reducer: {
    selection: selectionSlice,
    quiz: quizSlice,
    modal: modalSlice,
    score: scoreSlice,
  },
  devTools: false,
});

export default store;
