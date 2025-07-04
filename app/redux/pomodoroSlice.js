"use client";
const { createSlice } = require("@reduxjs/toolkit");

const pomodoroSlice = createSlice({
  name: "pomodoro",
  initialState: {
    focusTime: 25,
    shortBreakTime: 5,
    longBreakTime: 15,
    stopwatch: 0,
    is24Hour: true,
    autoStartNext: false,
  },
  reducers: {},
});

export default pomodoroSlice.reducer;
