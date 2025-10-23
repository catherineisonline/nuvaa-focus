"use client";
import { createSlice } from "@reduxjs/toolkit";
import { PREDEFINED_BACKGROUNDS } from "../../styles/backgrounds";
import { AppearanceState } from "../../types/appearance";

const initialState: AppearanceState = {
  currentTheme: "primary",
  currentBackground: null,
  backgrounds: [...PREDEFINED_BACKGROUNDS],
  customBackgrounds: [],
  backgroundBlur: 0,
  backgroundDim: 0,
};
const appearanceSlice = createSlice({
  name: "appearance",
  initialState,
  reducers: {
    setBackgroundBlur(state, action) {
      state.backgroundBlur = action.payload;
    },
    setBackgroundDim(state, action) {
      state.backgroundDim = action.payload;
    },
    initilizecustomBackgrounds(state, action) {
      state.customBackgrounds = [...action.payload];
    },
    setCurrentTheme(state, action) {
      state.currentTheme = action.payload;
    },
    setCurrentBackground(state, action) {
      state.currentBackground = action.payload;
    },
    setCurrentCustomBackground(state, action) {
      if (!state.customBackgrounds.includes(action.payload)) {
        state.customBackgrounds.push(action.payload);
      }
      state.currentBackground = action.payload;
    },
    removeBackground(state) {
      state.currentBackground = null;
    },
    removeCustomBackground(state, action) {
      if (state.currentBackground === action.payload) {
        state.currentBackground = null;
      }
      const bgs = state.customBackgrounds;
      state.customBackgrounds = bgs.filter((img) => img !== action.payload);
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
