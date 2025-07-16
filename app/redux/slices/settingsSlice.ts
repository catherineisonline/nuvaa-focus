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
  },
  reducers: {
    updateSettingsTab(state, action) {
      const tab = action.payload.tab;
      state.settingsTab = tab;
    },
    updateSettings(state, action) {
      const { key, value } = action.payload;
      console.log(value);
      state[key] = value;
    },
    setupSettings(state, action) {
      const cachedSettings = action.payload;
      state = cachedSettings;
    },
  },
});
export default settingsSlice.reducer;
export const { updateSettings, setupSettings, updateSettingsTab } =
  settingsSlice.actions;
