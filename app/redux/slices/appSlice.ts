import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: { streak: 0, currentTab: "focus", changesSavedMsg: "" },
  reducers: {
    initStreak(state, action) {
      state.streak = action.payload;
    },
    setStreak(state) {
      state.streak += 1;
    },
    setCurrentTab(state, action) {
      state.currentTab = action.payload;
    },
    updateChangesSavedMsg(state, action) {
      state.changesSavedMsg = action.payload;
    },
  },
});
export default appSlice.reducer;
export const { setStreak, initStreak, setCurrentTab, updateChangesSavedMsg } = appSlice.actions;
