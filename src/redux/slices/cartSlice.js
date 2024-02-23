import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    totalPrice: 0,
    items: []
}


export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const findItem = state.items.find(pizza =>
                pizza.id === action.payload.id &&
                pizza.typeProp === action.payload.typeProp &&
                pizza.pizzaSize === action.payload.pizzaSize
            )

            if (findItem) {
                findItem.count++
            } else {
                state.items.push({...action.payload, count: 1})
            }

            state.totalPrice = state.items.reduce((sum, pizza) => pizza.price * pizza.count + sum, 0)

        },
        removeItem: (state, action) => {
            console.log(action.payload)
            state.items = state.items.filter(item => {
                    if (item.id !== action.payload.id) {
                        return true
                    } else if (item.typeProp !== action.payload.typeProp || item.pizzaSize !== action.payload.pizzaSize) {
                        return true
                    }

                    return false
                }
            )
            state.totalPrice = state.items.reduce((sum, pizza) => pizza.price * pizza.count + sum, 0)
        },
        clearItems: (state) => {
            state.items = []
            state.totalPrice = 0
        },

        decrement: (state, action) => {
            const findItem = state.items.find(pizza =>
                pizza.id === action.payload.id &&
                pizza.typeProp === action.payload.typeProp &&
                pizza.pizzaSize === action.payload.pizzaSize
            )

            if (findItem) {
                findItem.count--
                state.totalPrice = state.items.reduce((sum, pizza) => pizza.price * pizza.count + sum, 0)

            }
        }
    },
})



export const selectCartData = state => state.cartSlice


export const {addItem, removeItem, decrement, clearItems} = cartSlice.actions
export default cartSlice.reducer