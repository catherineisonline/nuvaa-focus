import { createSlice } from "@reduxjs/toolkit";

const musicSlice = createSlice({
  name: "music",
  initialState: {
    selectedOption: "none",
    customUrl: "",
    musicUrl: "",
    youtubeId: "",
    musicEnabled: false,
    musicModalOn: false,
    hideModal: false,
  },
  reducers: {
    setSelectedOption(state, action) {
      const value = action.payload.value;
      state.selectedOption = value;
    },
    setCustomUrl(state, action) {
      const value = action.payload.value;
      state.customUrl = value;
    },
    setMusicUrl(state, action) {
      const value = action.payload.value;
      state.musicUrl = value;
    },
    setMusicEnabled(state, action) {
      const value = action.payload.value;
      state.musicEnabled = value;
    },
    setMusicModalOn(state, action) {
      const value = action.payload.value;
      state.musicModalOn = value;
    },
    setHideModal(state, action) {
      const value = action.payload.value;
      state.hideModal = value;
    },
  },
});

export default musicSlice.reducer;
export const {
  setSelectedOption,
  setCustomUrl,
  setMusicUrl,
  setMusicEnabled,
  setMusicModalOn,
  setHideModal,
} = musicSlice.actions;
