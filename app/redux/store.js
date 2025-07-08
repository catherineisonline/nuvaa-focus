"use client";
import { configureStore } from "@reduxjs/toolkit";
import pomodoroSlice from "./pomodoroSlice";
import navigationSlice from "./navigationSlice";
import settingsSlice from "./settingsSlice";
export const store = configureStore({
  reducer: {
    pomodoro: pomodoroSlice,
    navigation: navigationSlice,
    settings: settingsSlice,
  },
});
