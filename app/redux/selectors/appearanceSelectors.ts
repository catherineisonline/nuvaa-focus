import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { AppearanceState } from "../slices/appearanceSlice";

export const selectCurrentTheme = (state: RootState): AppearanceState["currentTheme"] => state.appearance.currentTheme;
export const selectCurrentBackground = (state: RootState): AppearanceState["currentBackground"] =>
  state.appearance.currentBackground;
export const selectBackgrounds = (state: RootState): AppearanceState["backgrounds"] => state.appearance.backgrounds;
export const selectCustomBackgrounds = (state: RootState): AppearanceState["customBackgrounds"] =>
  state.appearance.customBackgrounds;
export const selectBackgroundBlur = (state: RootState): AppearanceState["backgroundBlur"] =>
  state.appearance.backgroundBlur;
export const selectBackgroundDim = (state: RootState): AppearanceState["backgroundDim"] =>
  state.appearance.backgroundDim;

export const appearanceSelectors = createSelector(
  [
    selectBackgroundBlur,
    selectBackgroundDim,
    selectCurrentTheme,
    selectCurrentBackground,
    selectBackgrounds,
    selectCustomBackgrounds,
  ],
  (backgroundBlur, backgroundDim, currentTheme, currentBackground, backgrounds, customBackgrounds) => ({
    currentTheme,
    currentBackground,
    backgrounds,
    customBackgrounds,
    backgroundBlur,
    backgroundDim,
  })
);
