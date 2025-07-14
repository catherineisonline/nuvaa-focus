import { createSlice } from "@reduxjs/toolkit";

const stopwatchSlice = createSlice({
  name: "stopwatch",
  initialState: {
    timeLeftStopwatch: 0,
    stopwatchIsRunning: false,
  },
  reducers: {
    updateStopwatchTime(state, action) {
      const time = action.payload.time;
      state.timeLeftStopwatch = time;
    },
    tickStopwatchTime(state) {
      state.timeLeftStopwatch += 1;
    },
    toggleStopwatch(state) {
      const current = state.stopwatchIsRunning;
      state.stopwatchIsRunning = !current;
    },
    stopStopwatch(state) {
      state.stopwatchIsRunning = false;
    },
  },
});

export default stopwatchSlice.reducer;
export const {
  updateStopwatchTime,
  tickStopwatchTime,
  stopStopwatch,
  toggleStopwatch,
} = stopwatchSlice.actions;
