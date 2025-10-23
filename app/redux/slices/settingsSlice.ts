import { createSlice } from "@reduxjs/toolkit";

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    focusTime: 1500,
    shortBreakTime: 300,
    longBreakTime: 900,
    is24Hour: true,
    autoStartNext: false,
    settingsTab: "timer",
    isMusicPlaying: false,
  },
  reducers: {
    initSettings(state, action) {
      state = action.payload;
    },
    updateSettingsTab(state, action) {
      state.settingsTab = action.payload;
    },
    updateSettings(state, action) {
      const { key, value } = action.payload;
      if (key === 0) {
        state.is24Hour = false;
      } else if (key === 1) {
        state.is24Hour = true;
      } else if (key === "focus") {
        state.focusTime = value;
      } else if (key === "shortBreakTime") {
        state.shortBreakTime = value;
      } else if (key === "longBreakTime") {
        state.longBreakTime = value;
      } else if (key === "autoStartNext") {
        state.autoStartNext = true;
      }
    },
    setIsMusicPlaying(state, action) {
      state.isMusicPlaying = action.payload;
    },
  },
});
export default settingsSlice.reducer;
export const { updateSettings, initSettings, updateSettingsTab, setIsMusicPlaying } = settingsSlice.actions;
