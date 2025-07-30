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
    backgroundBlur: 0,
    backgroundDim: 0,
  },
  reducers: {
    setBackgroundBlur(state, action) {
      state.backgroundBlur = action.payload.value;
    },
    setBackgroundDim(state, action) {
      state.backgroundDim = action.payload.value;
    },
    initilizecustomBackgrounds(state, action) {
      state.customBackgrounds = [...action.payload.data];
    },
    setCurrentTheme(state, action) {
      state.currentTheme = action.payload.name;
    },
    setCurrentBackground(state, action) {
      const img = action.payload.image;
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
  initilizecustomBackgrounds,
  setBackgroundBlur,
  setBackgroundDim,
} = appearanceSlice.actions;
