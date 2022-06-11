import { configureStore } from "@reduxjs/toolkit";
import navOpenReducer from "../features/navOpen/navOpenSlice";

export const store = configureStore({
  reducer: {
    navOpen: navOpenReducer,
  }
})