"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import {
  setCustomQuote,
  setIsEditingQuote,
  setTempCustomQuote,
} from "../../../redux/slices/quotesSlice";

import {
  QuoteDisplayInput,
  QuoteDisplayText,
  QuoteSection,
} from "./Quote.styled";
import { useBackgroundStatus } from "../../../hooks/useBackgroundStatus";
import React from "react";

export const Quotes = () => {
  const dispatch = useDispatch();
  const isBackgroundActive = useBackgroundStatus();
  const isQuotesShown = useSelector(
    (state: RootState) => state.quotes.isQuotesShown
  );
  const isEditingQuote = useSelector(
    (state: RootState) => state.quotes.isEditingQuote
  );
  const customQuote = useSelector(
    (state: RootState) => state.quotes.customQuote
  );
  const currentQuote = useSelector(
    (state: RootState) => state.quotes.currentQuote
  );
  const tempCustomQuote = useSelector(
    (state: RootState) => state.quotes.tempCustomQuote
  );
  const handleIsEditingQuote = () => {
    dispatch(setIsEditingQuote());
    dispatch(setTempCustomQuote({ value: customQuote || currentQuote }));
  };
  const handleTempQuote = (val: string) => {
    dispatch(setTempCustomQuote({ value: val }));
  };
  const handleCustomQuote = () => {
    dispatch(setIsEditingQuote());
    dispatch(setCustomQuote({ value: tempCustomQuote }));
  };
  return (
    <React.Fragment>
      {isQuotesShown && (
        <QuoteSection>
          {isEditingQuote ? (
            <QuoteDisplayInput
              as={"textarea"}
              autoFocus
              value={tempCustomQuote}
              onChange={(e) => handleTempQuote(e.target.value)}
              onBlur={handleCustomQuote}
              rows={1}
              maxLength={65}
            />
          ) : (
            <QuoteDisplayText
              $bgImage={isBackgroundActive}
              onClick={handleIsEditingQuote}>
              {customQuote || currentQuote}
            </QuoteDisplayText>
          )}
        </QuoteSection>
      )}
    </React.Fragment>
  );
};
