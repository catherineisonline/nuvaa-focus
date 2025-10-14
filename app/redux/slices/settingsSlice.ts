import { createSlice } from "@reduxjs/toolkit";

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    focusTime: 1500,
    shortBreakTime: 300,
    longBreakTime: 900,
    stopwatch: 0,
    is24Hour: true,
    autoStartNext: false,
    settingsTab: "timer",
    isMusicPlaying: false,
  },
  reducers: {
    updateSettingsTab(state, action) {
      const tab = action.payload.tab;
      state.settingsTab = tab;
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
    setupSettings(state, action) {
      const cachedSettings = action.payload;
      state = cachedSettings;
    },
    setIsMusicPlaying(state, action) {
      const value = action.payload.value;
      state.isMusicPlaying = value;
    },
  },
});
export default settingsSlice.reducer;
export const { updateSettings, setupSettings, updateSettingsTab, setIsMusicPlaying } = settingsSlice.actions;
