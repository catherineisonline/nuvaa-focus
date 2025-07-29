"use client";
import { createSlice } from "@reduxjs/toolkit";
import { PREDEFINED_BACKGROUNDS } from "../../styles/backgrounds";

const appearanceSlice = createSlice({
  name: "appearance",
  initialState: {
    currentTheme: "primary",
    currentBackground: null,
    backgrounds: [...PREDEFINED_BACKGROUNDS],
    customBackgrounds: [],
  },
  reducers: {
    setCurrentTheme(state, action) {
      state.currentTheme = action.payload.name;
    },
    setCurrentBackground(state, action) {
      const img = action.payload.image;
      if (!state.backgrounds.includes(img)) {
        state.backgrounds.push(img);
      }
      state.currentBackground = img;
    },
    setCurrentCustomBackground(state, action) {
      const img = action.payload.image;
      if (!state.customBackgrounds.includes(img)) {
        state.customBackgrounds.push(img);
      }
      state.currentBackground = img;
    },
    removeBackground(state) {
      state.currentBackground = null;
    },
    removeCustomBackground(state, action) {
      const src = action.payload.src;
      if (state.currentBackground === src) {
        state.currentBackground = null;
      }
      const bgs = state.customBackgrounds;
      state.customBackgrounds = bgs.filter((img) => img !== src);
    },
  },
});

export default appearanceSlice.reducer;
export const {
  setCurrentTheme,
  setCurrentBackground,
  removeBackground,
  setCurrentCustomBackground,
  removeCustomBackground,
} = appearanceSlice.actions;
