const { createSlice } = require("@reduxjs/toolkit");

const navigationSlice = createSlice({
  name: "navigation",
  initialState: {
    isFullscreen: false,
    isSettingsActive: false,
    isTasksActive: false,
    isMusicActive: false,
  },
  reducers: {
    toggleModal(state, action) {
      const modal = action.payload.target;
      const isActive = state[modal];
      if (modal === "isFullscreen") {
        if (!isActive) {
          document.documentElement.requestFullscreen?.();
        } else {
          document.exitFullscreen?.();
        }
      }
      state[modal] = !isActive;
    },
    closeModal(state, action) {
      const modal = action.payload.target;
      const isActive = state[modal];
      state[modal] = !isActive;
    },
  },
});

export default navigationSlice.reducer;
export const { toggleModal, closeModal } = navigationSlice.actions;
