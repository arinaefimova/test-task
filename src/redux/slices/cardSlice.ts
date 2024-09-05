import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type CardState = {
    favArray: Array<string>;  
     removedIds:string[];
};


const initialState: CardState = {
    favArray: [],
     removedIds: []
};


export const cardSlice = createSlice({
    name: 'card',
    initialState,
    reducers: {
        toggleFav: (state, action: PayloadAction<string>) => {
            if (state.favArray.includes(action.payload)){
                state.favArray = state.favArray.filter(fav=> fav !== action.payload);
            }
            else{
                state.favArray.push(action.payload);
            }
        },
        setRemovedProduct:(state, action:PayloadAction<string>)=>{
            if(!state.removedIds.includes(action.payload)){
                state.removedIds.push(action.payload);
            }
        },
        removeProduct:(state, action:PayloadAction<string>)=>{
            state.removedIds = state.removedIds.filter(id => id !== action.payload);
        }
    },
 
})
export const { toggleFav, setRemovedProduct, removeProduct }  = cardSlice.actions
export default cardSlice.reducer