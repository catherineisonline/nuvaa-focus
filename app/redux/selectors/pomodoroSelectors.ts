import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const selectPomodoroCount = (state: RootState) =>
  state.pomodoro.pomodoroCount;
export const selectTimeLeft = (state: RootState) => state.pomodoro.timeLeft;
export const selectIsRunning = (state: RootState) => state.pomodoro.isRunning;
export const selectCurrentMode = (state: RootState) =>
  state.pomodoro.currentMode;
export const pomodoroSelectors = createSelector(
  [selectPomodoroCount, selectTimeLeft, selectIsRunning, selectCurrentMode],
  (pomodoroCount, timeLeft, isRunning, currentMode) => ({
    pomodoroCount,
    timeLeft,
    isRunning,
    currentMode,
  })
);
