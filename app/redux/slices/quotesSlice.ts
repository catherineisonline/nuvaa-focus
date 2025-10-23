import { createSlice } from "@reduxjs/toolkit";
import { MOTIVATIONAL_QUOTES } from "../../lib/constants";

const quotesSlice = createSlice({
  name: "quotes",
  initialState: {
    quotes: [...MOTIVATIONAL_QUOTES],
    isQuotesShown: false,
    currentQuote: "",
    customQuote: "",
    tempCustomQuote: "",
    isEditingQuote: false,
  },
  reducers: {
    showQuotes(state) {
      state.isQuotesShown = !state.isQuotesShown;
      if (!state.isQuotesShown) {
        state.customQuote = "";
      }
    },
    initilizeIsQuotesShown(state, action) {
      state.isQuotesShown = action.payload;
    },
    setCustomQuote(state, action) {
      state.customQuote = action.payload;
    },
    setTempCustomQuote(state, action) {
      state.tempCustomQuote = action.payload;
    },

    setCurrentQuote(state, action) {
      state.currentQuote = state.quotes[action.payload];
    },
    setIsEditingQuote(state) {
      state.isEditingQuote = !state.isEditingQuote;
    },
  },
});

export default quotesSlice.reducer;
export const {
  showQuotes,
  setCustomQuote,
  setTempCustomQuote,
  setCurrentQuote,
  setIsEditingQuote,
  initilizeIsQuotesShown,
} = quotesSlice.actions;
