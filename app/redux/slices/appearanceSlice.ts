"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PREDEFINED_BACKGROUNDS } from "../../styles/backgrounds";
import type { StaticImageData } from "next/image";

export interface AppearanceState {
  currentTheme: string;
  currentBackground: string | null | StaticImageData;
  backgrounds: (string | StaticImageData)[];
  customBackgrounds: (string | StaticImageData)[];
  backgroundBlur: number;
  backgroundDim: number;
}

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
    setBackgroundBlur(state, action: PayloadAction<{ value: number }>) {
      state.backgroundBlur = action.payload.value;
    },
    setBackgroundDim(state, action: PayloadAction<{ value: number }>) {
      state.backgroundDim = action.payload.value;
    },
    initilizecustomBackgrounds(state, action: PayloadAction<{ data: (string | StaticImageData)[] }>) {
      state.customBackgrounds = [...action.payload.data];
    },
    setCurrentTheme(state, action: PayloadAction<{ name: string }>) {
      state.currentTheme = action.payload.name;
    },
    setCurrentBackground(state, action: PayloadAction<{ image: string | StaticImageData }>) {
      const img = action.payload.image;
      state.currentBackground = img;
    },
    setCurrentCustomBackground(state, action: PayloadAction<{ image: string | StaticImageData }>) {
      const img = action.payload.image;
      if (!state.customBackgrounds.includes(img)) {
        state.customBackgrounds.push(img);
      }
      state.currentBackground = img;
    },
    removeBackground(state) {
      state.currentBackground = null;
    },
    removeCustomBackground(state, action: PayloadAction<{ src: string | StaticImageData }>) {
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
