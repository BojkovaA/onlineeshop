import { createSlice

 } from "@reduxjs/toolkit";
const CartSlice = createSlice({
    name: 'cart',
    initialState:{
        cart: [],
        totalProduct: 0,
    },
    reducers: {
        saveInCartAction: (state, action)=>{
            console.log(action.payload);
            let copyCart = [...state.cart]
            
            //find index dupllicates

            let findIndex = null;

            copyCart.find((item, index) => {
                if(item.id === action.payload.id){
                    findIndex = index;
                    return;
                }
            })

            //copyCart[findIndex].quantity += 1

            if(findIndex === null){
                   //push
                   copyCart.push({...action.payload, count: 1, cartTotal:action.payload.price});
                   state.totalProduct += 1;
            }else{
                //count +1
                copyCart[findIndex].count += 1;
            }

            state.cart = copyCart;

            localStorage.setItem('cartItem', JSON.stringify(copyCart))
            localStorage.setItem('cart_total', JSON.stringify(state.totalProduct))
        },
        deleteFromCartAction: (state, action) => {
            console.log(action.payload);
    }
    }
})

export const {saveInCartAction} = CartSlice.actions;
export default CartSlice.reducer;