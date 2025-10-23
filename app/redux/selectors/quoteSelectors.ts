import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const isQuotesShown = (state: RootState) => state.quotes.isQuotesShown;
const customQuote = (state: RootState) => state.quotes.customQuote;
const isEditingQuote = (state: RootState) => state.quotes.isEditingQuote;
const currentQuote = (state: RootState) => state.quotes.currentQuote;
const tempCustomQuote = (state: RootState) => state.quotes.tempCustomQuote;
const quotes = (state: RootState) => state.quotes.quotes;

export const quoteSelectors = createSelector(
  [isQuotesShown, customQuote, isEditingQuote, currentQuote, tempCustomQuote, quotes],
  (isQuotesShown, customQuote, isEditingQuote, currentQuote, tempCustomQuote, quotes) => ({
    isQuotesShown,
    customQuote,
    isEditingQuote,
    currentQuote,
    tempCustomQuote,
    quotes,
  })
);
