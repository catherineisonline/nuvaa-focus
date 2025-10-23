import { createSlice } from "@reduxjs/toolkit";

const navigationSlice = createSlice({
  name: "navigation",
  initialState: {
    isFullscreen: false,
    isSettingsActive: false,
    isTasksActive: false,
    isHamburgerActive: false,
  },
  reducers: {
    toggleHamburger(state) {
      const current = state.isHamburgerActive;
      state.isHamburgerActive = !current;
    },
    toggleModal(state, action) {
      const modal = action.payload;
      const isActive = state[modal];
      if (modal === "isFullscreen") {
        if (!isActive) {
          document.documentElement.requestFullscreen?.();
        } else {
          document.exitFullscreen?.();
        }
      }
      state[modal] = !isActive;
      state.isHamburgerActive = false;
    },
    closeModal(state, action) {
      const modal = action.payload.target;
      if (modal === "closeMusicModal") {
        state.isHamburgerActive = false;
      }
      const isActive = state[modal];
      state[modal] = !isActive;
    },
  },
});

export default navigationSlice.reducer;
export const { toggleModal, closeModal, toggleHamburger } = navigationSlice.actions;
