import { createSlice } from "@reduxjs/toolkit";

const analyticsSlice = createSlice({
  name: "analytics",
  initialState: {
    todayPomodoros: 0,
    todayFocusTime: 0,
    weeklyProgress: [
      { day: "Mon", pomodoros: 0, focusTime: 0 },
      { day: "Tue", pomodoros: 0, focusTime: 0 },
      { day: "Wed", pomodoros: 0, focusTime: 0 },
      { day: "Thu", pomodoros: 0, focusTime: 0 },
      { day: "Fri", pomodoros: 0, focusTime: 0 },
      { day: "Sat", pomodoros: 0, focusTime: 0 },
      { day: "Sun", pomodoros: 0, focusTime: 0 },
    ],
  },
  reducers: {},
});

export default analyticsSlice.reducer;
