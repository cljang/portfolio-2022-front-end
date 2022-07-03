import { configureStore } from "@reduxjs/toolkit";
import navOpenReducer from "../features/navOpen/navOpenSlice";
import projectDataReducer from "../features/projectData/projectDataSlice";

export const store = configureStore({
  reducer: {
    navOpen: navOpenReducer,
    project: projectDataReducer,
  }
})