import { configureStore } from "@reduxjs/toolkit";

//slice
import CategorySlice from '../store/CategorySlice';
import ProductSlice from '../store/ProductSlice';
import CartSlice from '../store/CartSlice';
import FavoriteSlice from '../store/FavoriteSlice';


const store = configureStore({
    reducer: {
        categoryStore: CategorySlice,
        productStore: ProductSlice,
        cartStore: CartSlice,
        favoriteStore: FavoriteSlice
    }
})

export default store;