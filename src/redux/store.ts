import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice';
import cardReducer from './slices/cardSlice';
import productReducer from './slices/productSlice';
import filterReducer from './slices/filtersSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Использует Local Storage
import { combineReducers } from 'redux';

// Конфигурация persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['card', 'product', 'filter'], // Здесь указываются редьюсеры, которые нужно сохранять
};

// Комбинируем редьюсеры
const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  card: cardReducer,
  product: productReducer,
  filter: filterReducer,
});

// Оборачиваем корневой редьюсер в persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Создаём store с persistedReducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Это отключает проверку сериализуемости для redux-persist
    }).concat(apiSlice.middleware),
});

// Экспортируем persistor
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
