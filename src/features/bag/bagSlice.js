import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    arr: []
}
const bagSlice = createSlice({
    name: "bagSlice",
    initialState,
    reducers: {
        addBag: (state, action) => {

        },

        deleteBagFromStore: (state, action) => {
            state.arr = state.arr.filter(item => item._id != action.payload._id);

        }
    }
})
export const { deleteBagFromStore } = bagSlice.actions;
export default bagSlice.reducer;
