import { createSlice } from "@reduxjs/toolkit";

const stopwatchSlice = createSlice({
  name: "stopwatch",
  initialState: {
    timeLeftStopwatch: 0,
    isStopwatchRunning: false,
    stopwatchTime: 0,
  },
  reducers: {
    updateStopwatchTime(state, action) {
      state.timeLeftStopwatch = action.payload;
    },
    tickStopwatchTime(state) {
      state.timeLeftStopwatch += 1;
    },
    toggleStopwatch(state) {
      state.isStopwatchRunning = !state.isStopwatchRunning;
    },
    stopStopwatch(state) {
      state.isStopwatchRunning = false;
    },
  },
});

export default stopwatchSlice.reducer;
export const { updateStopwatchTime, tickStopwatchTime, stopStopwatch, toggleStopwatch } = stopwatchSlice.actions;
