import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: false,
  loaded: false,
}

export const projectDataSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProjectData: (state, action) => {
      state.projects = action.payload;
    },
    setLoaded: (state, action) => {
      state.loaded = action.payload;
    }
  }
})

export const { setProjectData, setLoaded } = projectDataSlice.actions;

const projectDataReducer = projectDataSlice.reducer;
export default projectDataReducer;