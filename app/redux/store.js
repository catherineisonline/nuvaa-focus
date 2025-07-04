"use client";
import { configureStore } from "@reduxjs/toolkit";
import pomodoroSlice from "./pomodoroSlice";
import navigationSlice from "./navigationSlice";
export const store = configureStore({
  reducer: {
    pomodoro: pomodoroSlice,
    navigation: navigationSlice,
  },
});
