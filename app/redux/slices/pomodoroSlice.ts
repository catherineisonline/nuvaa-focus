"use client";
import { createSlice } from "@reduxjs/toolkit";

const pomodoroSlice = createSlice({
  name: "pomodoro",
  initialState: {
    pomodoroCount: 0,
    timeLeft: 1500,
    isRunning: false,
    currentMode: "focus",
  },
  reducers: {
    togglePomodoro(state) {
      state.isRunning = !state.isRunning;
    },
    stopPomodoro(state) {
      state.isRunning = false;
    },
    updateTimeLeft(state, action) {
      state.timeLeft = action.payload;
    },
    updateCount(state) {
      state.pomodoroCount += 1;
    },
    updateMode(state, action) {
      state.currentMode = action.payload;
    },
    timeTick(state) {
      if (state.timeLeft > 0) {
        state.timeLeft -= 1;
      }
    },
  },
});

export default pomodoroSlice.reducer;
export const { togglePomodoro, updateTimeLeft, updateCount, timeTick, stopPomodoro, updateMode } =
  pomodoroSlice.actions;
