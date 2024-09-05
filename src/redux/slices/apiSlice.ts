// src/api/apiSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Recipe } from '../../types';

// Application ID и Application Key
const API_ID = 'cd6e4346';
const API_KEY = 'ef4de7a4c2feae3364f5e872f54dbd35';

interface ApiResponse {
  hits: { recipe: Recipe }[];
}

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
      baseUrl: 'https://api.edamam.com',
    }),
    endpoints: (builder) => ({
      getRecipes: builder.query<ApiResponse, { query: string; maxCalories?: number, ingredients?:number }>({
        query: ({ query, maxCalories, ingredients }) => {
          const calorieParam = typeof maxCalories === 'number' ? `&calories=0-${maxCalories}` : '';
         const ingrParameter = typeof ingredients === 'number' ? `&ingr=1-${ingredients}` : ''
          return `search?q=${query}&app_id=${API_ID}&app_key=${API_KEY}&from=0&to=50${calorieParam}${ingrParameter}`;
        },
      }),
    }),
  });

export const { useGetRecipesQuery } = apiSlice;
