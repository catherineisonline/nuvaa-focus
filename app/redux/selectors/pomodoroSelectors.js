import { createSelector } from "@reduxjs/toolkit";

export const selectPomodoroCount = (state) => state.pomodoro.pomodoroCount;
export const selectTimeLeft = (state) => state.pomodoro.timeLeft;
export const selectIsRunning = (state) => state.pomodoro.isRunning;
export const selectProgress = (state) => state.pomodoro.progress;
export const selectCurrentMode = (state) => state.pomodoro.currentMode;
export const pomodoroSelectors = createSelector(
  [
    selectPomodoroCount,
    selectTimeLeft,
    selectIsRunning,
    selectProgress,
    selectCurrentMode,
  ],
  (pomodoroCount, timeLeft, isRunning, progress, currentMode) => ({
    pomodoroCount,
    timeLeft,
    isRunning,
    progress,
    currentMode,
  })
);
