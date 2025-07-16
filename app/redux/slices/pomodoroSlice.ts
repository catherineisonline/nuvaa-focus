"use client";
import { createSlice } from "@reduxjs/toolkit";

const pomodoroSlice = createSlice({
  name: "pomodoro",
  initialState: {
    pomodoroCount: 0,
    timeLeft: 1500,
    isRunning: false,
    progress: 0,
    currentMode: "focusTime",
  },
  reducers: {
    togglePomodoro(state) {
      const isActive = state.isRunning;
      state.isRunning = !isActive;
    },
    stopPomodoro(state) {
      state.isRunning = false;
    },
    updateTimeLeft(state, action) {
      const time = action.payload.time;
      state.timeLeft = time;
    },
    updateCount(state) {
      const currentCount = state.pomodoroCount;
      state.pomodoroCount = currentCount + 1;
    },
    updateProgress(state, action) {
      const time = action.payload.time;
      state.progress = time;
    },
    updateMode(state, action) {
      const mode = action.payload.mode;
      state.currentMode = mode;
    },
    timeTick(state) {
      if (state.timeLeft > 0) {
        state.timeLeft -= 1;
      }
    },
  },
});

export default pomodoroSlice.reducer;
export const {
  togglePomodoro,
  updateTimeLeft,
  updateCount,
  timeTick,
  updateProgress,
  stopPomodoro,
  updateMode,
} = pomodoroSlice.actions;
