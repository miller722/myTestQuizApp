import { combineReducers, configureStore } from '@reduxjs/toolkit';
import quizzesReducer from './quizzesSlice';

import { loadState } from './browser-storage';

const reducers = combineReducers({
  quizzes: quizzesReducer,
});

export const store = configureStore({
  devTools: true,
  reducer: reducers,
  // here we restore the previously persisted state
  preloadedState: loadState(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
