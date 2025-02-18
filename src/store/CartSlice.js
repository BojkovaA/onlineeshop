import { createSlice

 } from "@reduxjs/toolkit";
const CartSlice = createSlice({
    name: 'cart',
    initialState:{
        cart: [],
        totalProduct: 0,
        totalPrice: 0
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
                   state.totalPrice += Math.floor(action.payload.price)
            }else{
                //count +1
                copyCart[findIndex].count += 1;
            }

            state.cart = copyCart;

            localStorage.setItem('cartItem', JSON.stringify(copyCart))
            localStorage.setItem('cart_total', JSON.stringify(state.totalProduct))
        },
        deleteFromCartAction: (state, action) => {

            let copyCart = [...state.cart];

            console.log(action.payload);

            let findIndex = null;

            copyCart.find((item, index)=>{
                if(item.id === action.payload.id){
                    findIndex = index;
                    return;
                }
            })

            if(findIndex !== null){
                copyCart.splice(findIndex, 1);
                state.totalProduct -= 1;
                state.totalPrice = subTotal(copyCart);
            }

            state.cart = copyCart
            localStorage.setItem('cartItem', JSON.stringify(copyCart))
            localStorage.setItem('cart_total', JSON.stringify(state.totalProduct))

        },

        setPriceHandlerAction: (state, action) =>{
            //console.log(action.payload);
            const {increment, index} = action.payload;
            let copyCart = [...state.cart];


            copyCart[index].cartTotal += copyCart[index].price * increment;
            state.totalPrice = subTotal(copyCart);

            if(copyCart[index].count === 1 && increment === -1){
                copyCart.splice(index, 1);
                state.totalProduct -= 1
            }else {
                copyCart[index].count += increment
                console.log("ulazi ovde...")
            }

            state.cart = copyCart;
            localStorage.setItem('cartItem', JSON.stringify(copyCart))
            localStorage.setItem('cart_total', JSON.stringify(state.totalProduct))

            
            
        },

    }
})

function subTotal(arrayCart){
    return arrayCart.reduce((acc, current)=>{
        return acc + current.cartTotal
    },0)
}

export const {saveInCartAction, deleteFromCartAction, setPriceHandlerAction} = CartSlice.actions;
export default CartSlice.reducer;