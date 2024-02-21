import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    categoryId: 0,
    currentPage: 1,
    sortType: {
        name: 'популярности (>)',
        type: 'rating',
        order: 'desc'
    },
    searchValue: ''
}


export const filterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        setSortType: (state, action) => {
            const { name, type, order } = action.payload;
            state.sortType = { name, type, order };
            state.currentPage = 1
        },

        setCategoryId: (state, action) => {
            state.categoryId = action.payload
            state.currentPage = 1
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        },
        setSearchValue: (state, action) => {
            state.searchValue = action.payload
            state.currentPage = 1
        }
    },
})

export const { setSortType, setCategoryId, setCurrentPage, setSearchValue } = filterSlice.actions

export default filterSlice.reducer