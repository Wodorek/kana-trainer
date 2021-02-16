import React, { createContext, useContext, useReducer } from 'react';

//split that into two (or more) reducers ?

const QuizContext = createContext();

const initialState = {
  selectedGroups: [],
  quizOn: false,
  totalQuestions: 0,
  questionsCorrect: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'startQuiz':
      return {
        ...state,
        quizOn: true,
      };
    case 'endQuiz':
      return {
        ...state,
        quizOn: false,
      };
    case 'addGroup':
      return {
        ...state,
        selectedGroups: [...state.selectedGroups, action.payload],
      };
    case 'removeGroup':
      const withoutRemoved = state.selectedGroups.filter((group) => {
        return group !== action.payload;
      });
      return { ...state, selectedGroups: [...withoutRemoved] };
    case 'addAll':
      const fullGroups = action.payload.filter((group) => {
        return !state.selectedGroups.includes(group);
      });
      return {
        ...state,
        selectedGroups: [...state.selectedGroups, ...fullGroups],
      };
    case 'removeAll':
      const emptyGroups = state.selectedGroups.filter((group) => {
        return !action.payload.includes(group);
      });
      return { ...state, selectedGroups: [...emptyGroups] };
    case 'setTotalQuestions':
      return { ...state, totalQuestions: action.payload };
    case 'questionCorrect':
      return {
        ...state,
        questionsCorrect: state.questionsCorrect + 1,
      };

    default:
      return state;
  }
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useStore = () => useContext(QuizContext);
