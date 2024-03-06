import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null
}
const userSlice = createSlice({

    name: "userSlice",
    initialState,
    reducers: {
        userIn: (state, action) => {
            state.currentUser = action.payload;
            localStorage.setItem("thisUser", JSON.stringify(state.currentUser));
        },
        userOut: (state) => {
            state.currentUser = null;
            localStorage.removeItem("thisUser");
        }

    }
})

export const { userIn, userOut } = userSlice.actions;

export default userSlice.reducer;