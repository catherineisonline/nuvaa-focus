import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: { streak: 0, currentTab: "focusTime", changesSavedMsg: "" },
  reducers: {
    initStreak(state, action) {
      const strk = action.payload.value;
      state.streak = strk;
    },
    setStreak(state) {
      state.streak += 1;
    },
    setCurrentTab(state, action) {
      const tab = action.payload.tab;
      state.currentTab = tab;
    },
    updateChangesSavedMsg(state, action) {
      const msg = action.payload.msg;
      state.changesSavedMsg = msg;
    },
  },
});
export default appSlice.reducer;
export const { setStreak, initStreak, setCurrentTab, updateChangesSavedMsg } =
  appSlice.actions;
