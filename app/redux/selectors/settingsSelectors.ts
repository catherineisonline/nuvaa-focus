import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const selectFocusTime = (state: RootState) => state.settings.focusTime;
export const selectShortBreakTime = (state: RootState) =>
  state.settings.shortBreakTime;
export const selectLongBreakTime = (state: RootState) =>
  state.settings.longBreakTime;
export const selectStopwatch = (state: RootState) => state.settings.stopwatch;
export const selectis24Hour = (state: RootState) => state.settings.is24Hour;
export const selectAutoStartNext = (state: RootState) =>
  state.settings.autoStartNext;
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
