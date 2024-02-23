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
    name: 'filter',
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
        },
        setFilters: (state, action) => {

            state.sortType.type = action.payload.sort.type
            state.sortType.order = action.payload.sort.order
            state.sortType.name = action.payload.sort.name

            state.currentPage = Number(action.payload.page)
            state.categoryId = Number(action.payload.categoryId)
        }
    },
})

export const selectFilters = (state) => state.filterSlice
export const selectPages = (state) => state.filterSlice.currentPage
export const { setSortType, setCategoryId, setCurrentPage, setSearchValue, setFilters } = filterSlice.actions

export default filterSlice.reducer



