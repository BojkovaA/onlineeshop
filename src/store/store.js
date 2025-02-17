import { configureStore } from "@reduxjs/toolkit";

//slice
import CategorySlice from '../store/CategorySlice';
import ProductSlice from '../store/ProductSlice';
import CartSlice from '../store/CartSlice';


const store = configureStore({
    reducer: {
        categoryStore: CategorySlice,
        productStore: ProductSlice,
        cartStore: CartSlice,
    }
})

export default store;