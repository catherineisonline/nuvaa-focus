import { RootState } from "../store";
import { createSelector } from "@reduxjs/toolkit";

const selectedOption = (state: RootState) => state.music.selectedOption;
const customUrl = (state: RootState) => state.music.customUrl;
const musicUrl = (state: RootState) => state.music.musicUrl;
const musicEnabled = (state: RootState) => state.music.musicEnabled;

export const musicSelectors = createSelector(
  [selectedOption, customUrl, musicUrl, musicEnabled],
  (selectedOption, customUrl, musicUrl, musicEnabled) => ({
    selectedOption,
    customUrl,
    musicUrl,
    musicEnabled,
  })
);
