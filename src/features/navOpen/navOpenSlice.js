import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
}

export const navOpenSlice = createSlice({
  name: "navOpen",
  initialState,
  reducers: {
    openNav: (state,) => {
      state.value = true;
    },
    closeNav: (state) => {
      state.value = false;
    },
    toggleNav: (state) => {
      state.value = !state.value;
    }
  }
})

export const {openNav, closeNav, toggleNav} = navOpenSlice.actions;

const navOpenReducer = navOpenSlice.reducer;
export default navOpenReducer;