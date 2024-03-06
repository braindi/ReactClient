import { configureStore } from "@reduxjs/toolkit";
import orderSlice from "../features/order/orderSlice.js";
import userSlice from "../features/user/userSlice.js";
import bagSlice from "../features/bag/bagSlice.js";


export const store = configureStore({
    reducer: {
        cartOrders: orderSlice,
        thisUser: userSlice,
        bags:bagSlice
    }
})