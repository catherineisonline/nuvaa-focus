import { createSlice } from "@reduxjs/toolkit";

const musicSlice = createSlice({
  name: "music",
  initialState: {
    selectedOption: "none",
    customUrl: "",
    musicUrl: "",
    youtubeId: "",
    musicEnabled: false,
  },
  reducers: {
    setSelectedOption(state, action) {
      state.selectedOption = action.payload;
    },
    setCustomUrl(state, action) {
      state.customUrl = action.payload;
    },
    setMusicUrl(state, action) {
      state.musicUrl = action.payload;
    },
    setMusicEnabled(state, action) {
      state.musicEnabled = action.payload;
    },
  },
});

export default musicSlice.reducer;
export const { setSelectedOption, setCustomUrl, setMusicUrl, setMusicEnabled } = musicSlice.actions;
