import { createSlice } from "@reduxjs/toolkit";

const FavoriteSlice = createSlice({
    name: 'favorite',
    initialState: {
        allFavorite: [],
        favoriteTotal: 0
    },
    reducers: {
        updateFavoriteAction: (state, action) => {
            console.log(action.payload)

            let copyFavorite = [...state.allFavorite];

            let findIndex = null;

            copyFavorite.find((item, index) => {
                if (item.id === action.payload.id) {
                    findIndex = index;
                    return;
                }
            })

            if(findIndex === null){
                copyFavorite.push(action.payload);
                state.favoriteTotal++;
            }else{
                copyFavorite.splice(findIndex, 1);
                state.favoriteTotal--;
            }

            state.allFavorite = copyFavorite;
        },
    }
})

export const {updateFavoriteAction} = FavoriteSlice.actions;
export default FavoriteSlice.reducer;