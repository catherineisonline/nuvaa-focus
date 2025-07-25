import { createSlice } from "@reduxjs/toolkit";

const appearanceSlice = createSlice({
  name: "appearance",
  initialState: {
    currentTheme: "primary",
  },
  reducers: {
    setCurrentTheme(state, action) {
      state.currentTheme = action.payload.name;
    },
  },
});

export default appearanceSlice.reducer;
export const { setCurrentTheme } = appearanceSlice.actions;
