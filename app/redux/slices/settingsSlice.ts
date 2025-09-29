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
      const { key } = action.payload;
      const format = state.is24Hour;
      if (key === 0 && format === true) {
        state.is24Hour = false;
      } else {
        state.is24Hour = true;
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
