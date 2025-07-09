"use client";
import { configureStore } from "@reduxjs/toolkit";
import pomodoroSlice from "./slices/pomodoroSlice";
import navigationSlice from "./slices/navigationSlice";
import settingsSlice from "./slices/settingsSlice";
import clockSlice from "./slices/clockSlice";
export const store = configureStore({
  reducer: {
    pomodoro: pomodoroSlice,
    navigation: navigationSlice,
    settings: settingsSlice,
    clock: clockSlice,
  },
});
