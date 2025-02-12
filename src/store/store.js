import { configureStore } from "@reduxjs/toolkit";

//slice
import CategorySlice from '../store/CategorySlice';
import ProductSlice from '../store/ProductSlice';


const store = configureStore({
    reducer: {
        categoryStore: CategorySlice,
        productStore: ProductSlice,
    }
})

export default store;