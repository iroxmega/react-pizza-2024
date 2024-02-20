import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    categoryId: 0,
    sortType: {
        name: 'популярности (>)',
        type: 'rating',
        order: 'desc'
    }
}


export const filterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        setSortType: (state, action) => {
            const { name, type, order } = action.payload;
            state.sortType = { name, type, order };
        },

        setCategoryId: (state, action) => {
            state.categoryId = action.payload
        }
    },
})

export const { setSortType, setCategoryId } = filterSlice.actions

export default filterSlice.reducer