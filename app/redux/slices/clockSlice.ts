import { createSlice } from "@reduxjs/toolkit";

const clockSlice = createSlice({
  name: "clock",
  initialState: { dateTime: "" },
  reducers: {
    setupDateTime(state, action) {
      const time = action.payload.time;
      state.dateTime = time;
    },
  },
});
export default clockSlice.reducer;
export const { setupDateTime } = clockSlice.actions;
