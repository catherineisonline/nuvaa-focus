import { createSelector } from "@reduxjs/toolkit";

export const selectFocusTime = (state) => state.settings.focusTime;
export const selectShortBreakTime = (state) => state.settings.shortBreakTime;
export const selectLongBreakTime = (state) => state.settings.longBreakTime;
export const selectStopwatch = (state) => state.settings.stopwatch;
export const selectis24Hour = (state) => state.settings.is24Hour;
export const selectAutoStartNext = (state) => state.settings.autoStartNext;
export const settingsSelectors = createSelector(
  [
    selectFocusTime,
    selectShortBreakTime,
    selectLongBreakTime,
    selectStopwatch,
    selectis24Hour,
    selectAutoStartNext,
  ],
  (
    focusTime,
    shortBreakTime,
    longBreakTime,
    stopwatch,
    is24Hour,
    autoStartNext
  ) => ({
    focusTime,
    shortBreakTime,
    longBreakTime,
    stopwatch,
    is24Hour,
    autoStartNext,
  })
);
