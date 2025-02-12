import { createSlice } from "@reduxjs/toolkit";

const CategorySlice = createSlice({
    name: 'category',
    initialState: {
        allCategory: [],
        isLoading: false,
    },
    reducers: {
        saveAllCategoryAction: (state, action) =>{
            console.log(action.payload);
            state.allCategory = action.payload; 
            state.isLoading = true;
        }
    }
})

export const {saveAllCategoryAction} =  CategorySlice.actions;
export default CategorySlice.reducer;