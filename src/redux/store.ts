import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice';
import { useDispatch } from 'react-redux';
import  cardReducer  from './slices/cardSlice';
import productReducer from './slices/productSlice';
import filterReducer from './slices/filtersSlice';
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    card: cardReducer,
    product:productReducer,
    filter:filterReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
