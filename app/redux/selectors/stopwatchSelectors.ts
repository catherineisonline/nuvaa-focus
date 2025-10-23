import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const isStopwatchRunning = (state: RootState) => state.stopwatch.isStopwatchRunning;
const timeLeftStopwatch = (state: RootState) => state.stopwatch.timeLeftStopwatch;
const stopwatchTime = (state: RootState) => state.stopwatch.stopwatchTime;

export const stopwatchSelectors = createSelector(
  [isStopwatchRunning, timeLeftStopwatch, stopwatchTime],
  (isStopwatchRunning, timeLeftStopwatch, stopwatchTime) => ({ isStopwatchRunning, timeLeftStopwatch, stopwatchTime })
);
