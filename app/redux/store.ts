"use client";
import { configureStore } from "@reduxjs/toolkit";
import pomodoroSlice from "./slices/pomodoroSlice";
import navigationSlice from "./slices/navigationSlice";
import settingsSlice from "./slices/settingsSlice";
import clockSlice from "./slices/clockSlice";
import stopwatchSlice from "./slices/stopwatchSlice";
import tasksSlice from "./slices/tasksSlice";
import appSLice from "./slices/appSlice";
import appearanceSlice from "./slices/appearanceSlice";
import quotesSlice from "./slices/quotesSlice";
import analyticsSlice from "./slices/analyticsSlice";

export const store = configureStore({
  reducer: {
    pomodoro: pomodoroSlice,
    navigation: navigationSlice,
    settings: settingsSlice,
    clock: clockSlice,
    stopwatch: stopwatchSlice,
    tasks: tasksSlice,
    app: appSLice,
    appearance: appearanceSlice,
    quotes: quotesSlice,
    analytics: analyticsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
