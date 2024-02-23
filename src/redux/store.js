import {configureStore} from '@reduxjs/toolkit'
import filterSliceReducer from "./slices/filterSlice";
import cartSliceReducer from "./slices/cartSlice";
import pizzaSliceReducer from "./slices/pizzaSlice";

export const store = configureStore({
    reducer: {
        filterSlice: filterSliceReducer,
        cartSlice: cartSliceReducer,
        pizzaSlice: pizzaSliceReducer

    },
})