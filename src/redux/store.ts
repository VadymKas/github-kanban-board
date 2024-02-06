import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import issuesSlice from './slices/issueSlice';

const store = configureStore({
  reducer: {
    issuesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
