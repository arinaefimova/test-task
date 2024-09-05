import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


type FilterState = {
    query:string,
    calories:number,
    ingr:number,
 
}

const initialState:FilterState ={
   query:'',
   calories:300,
   ingr:5
}

export const filterSlice = createSlice({
    name:'filter',
    initialState,
    reducers:{
        searchQuery:(state, action:PayloadAction<string>) => {
            state.query = action.payload
        },
        rangeChange:(state, action:PayloadAction<number>) => {
            state.calories = action.payload
        },
        countIngr:(state, action:PayloadAction<number>) => {
            state.ingr = action.payload
        }
      
    }
})
export const {searchQuery, rangeChange, countIngr} = filterSlice.actions;
export default filterSlice.reducer;