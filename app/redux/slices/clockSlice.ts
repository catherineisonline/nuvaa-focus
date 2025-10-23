import { createSlice } from "@reduxjs/toolkit";

const clockSlice = createSlice({
  name: "clock",
  initialState: { dateTime: "" },
  reducers: {
    setupDateTime(state, action) {
      state.dateTime = action.payload;
    },
  },
});
export default clockSlice.reducer;
export const { setupDateTime } = clockSlice.actions;
