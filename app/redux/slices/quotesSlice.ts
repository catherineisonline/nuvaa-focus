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
    setCustomQuote(state, action) {
      const val = action.payload.value;
      state.customQuote = val;
    },
    setTempCustomQuote(state, action) {
      const val = action.payload.value;
      state.tempCustomQuote = val;
    },

    setCurrentQuote(state, action) {
      const index = action.payload.index;
      state.currentQuote = state.quotes[index];
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
} = quotesSlice.actions;
