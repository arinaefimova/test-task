import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types";

type ProductState = {
	products: Product[];
	nextId: number;
    
};

const initialState: ProductState = {
	products: [],
	nextId: 1,
    
};

export const productSlice = createSlice({
	name: "product",
	initialState,
	reducers: {
		addProduct: (state, action: PayloadAction<Product>) => {
			const newProduct = { ...action.payload, id: state.nextId };
			state.products.push(newProduct);
			state.nextId += 1;
		},
		editProduct: (state, action: PayloadAction<Product>) => {
			const index = state.products.findIndex(
				(item) => item.id === action.payload.id
			);
            if(index !==-1){
                state.products[index] = action.payload;
            }
		},
        deleteProduct: (state, action: PayloadAction<number>) => {
            state.products = state.products.filter(p => p.id !== action.payload)
        }
      
	},
});
export const { addProduct, editProduct, deleteProduct } = productSlice.actions;
export default productSlice.reducer;
