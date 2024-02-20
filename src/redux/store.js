import { configureStore } from '@reduxjs/toolkit'
import filterSliceReducer from "./slices/filterSlice";

export const store = configureStore({
    reducer: { filterSlice: filterSliceReducer },
})