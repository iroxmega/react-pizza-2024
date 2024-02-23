import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from "axios";

export const fetchPizzaCount = createAsyncThunk('pizza/fetchPizzaCount', async (params) => {
    const {
        categoryId,
        searchValue
    } = params


    const categoryProp = categoryId > 0 ? `&category=${categoryId}` : ''
    const searchQueryProp = searchValue !== '' ? `&title=${searchValue}` : ''
    const { data } = await axios.get(
        `https://65d099daab7beba3d5e36950.mockapi.io/pizzas?`
        + searchQueryProp
        + categoryProp
    )

    return data.length
})
export const fetchPizza = createAsyncThunk('pizza/fetchPizzaStatus', async (params) => {
    const {
        categoryId,
        sortType,
        sortOrder,
        pageLimit,
        page,
        searchValue
    } = params

    const categoryProp = categoryId > 0 ? `&category=${categoryId}` : ''
    const sortProp = `&sortBy=${sortType}`
    const orderProp = `&order=${sortOrder}`
    const pageLimitProp = `&p=${page}&l=${pageLimit}`
    const searchQueryProp = searchValue !== '' ? `&title=${searchValue}` : ''

    const { data } = await axios.get(
        `https://65d099daab7beba3d5e36950.mockapi.io/pizzas?`
        + pageLimitProp
        + searchQueryProp
        + categoryProp
        + sortProp
        + orderProp
    )
    console.log(data)

    return data
})

const initialState = {
    totalCount: 0,
    items: [],
    status: ''
}


export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems: (state, action) => {
            state.items = action.payload
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPizza.pending, (state) => {
                state.status = 'loading';
                state.items = [];
            })
            .addCase(fetchPizza.fulfilled, (state, action) => {
                state.status = 'success';
                state.items = action.payload;
            })
            .addCase(fetchPizza.rejected, (state) => {
                state.status = 'error';
                state.items = [];
            })
            .addCase(fetchPizzaCount.pending, (state) => {
                state.totalCount = 0
            })
            .addCase(fetchPizzaCount.fulfilled, (state, action) => {
                state.totalCount = action.payload
            })
    },
})

export const selectPizzaData = (state) => state.pizzaSlice
export const { setItems } = pizzaSlice.actions
export default pizzaSlice.reducer