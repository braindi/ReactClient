import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    arr: []
}
const ordersSlice = createSlice({
    name: "orderSlice",
    initialState,
    reducers: {
        increase: (state, action) => {
            let find = false;
            state.arr.map((item) => {
                if (item._id === action.payload._id) {
                    item.count = action.payload.count;
                    find = true;
                }
            })
            if (!find) {
                state.arr = [...state.arr, action.payload];
            }
        },

        decrease: (state, action) => {
            state.arr.map((item) => {
                if (item._id === action.payload._id) {
                    if (item.count > 1)
                        item.count--;
                }
            })
        },
        deleteBag: (state, action) => {
            state.arr = state.arr.filter(item => item._id != action.payload._id);
        }
    }
})
export const { increase, decrease, deleteBag } = ordersSlice.actions;

export default ordersSlice.reducer;