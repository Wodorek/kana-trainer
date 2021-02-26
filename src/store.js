import { configureStore } from '@reduxjs/toolkit';

import selectionSlice from './features/SelectionScreen/selectionSlice';
import quizSlice from './features/QuizScreen/quizSlice';

const store = configureStore({
  reducer: {
    selection: selectionSlice,
    quiz: quizSlice,
  },
});

export default store;
