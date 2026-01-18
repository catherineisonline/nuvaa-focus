"use client";
import { useDispatch, useSelector } from "react-redux";
import { setCustomQuote, setIsEditingQuote, setTempCustomQuote } from "../../../redux/slices/quotesSlice";

import { QuoteDisplayInput, QuoteDisplayText, QuoteSection } from "./Quote.styled";
import { useBackgroundStatus } from "../../../hooks/useBackgroundStatus";
import React from "react";
import { quoteSelectors } from "../../../redux/selectors/quoteSelectors";

export const Quotes = () => {
  const dispatch = useDispatch();
  const isBackgroundActive = useBackgroundStatus();
  const { isQuotesShown, isEditingQuote, customQuote, currentQuote, tempCustomQuote } = useSelector(quoteSelectors);

  const handleIsEditingQuote = () => {
    dispatch(setIsEditingQuote());
    dispatch(setTempCustomQuote(customQuote || currentQuote));
  };
  const handleTempQuote = (val: string) => {
    dispatch(setTempCustomQuote(val));
  };
  const handleCustomQuote = () => {
    dispatch(setIsEditingQuote());
    dispatch(setCustomQuote(tempCustomQuote));
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
            <QuoteDisplayText $bgImage={isBackgroundActive} onClick={handleIsEditingQuote}>
              {customQuote || currentQuote}
            </QuoteDisplayText>
          )}
        </QuoteSection>
      )}
    </React.Fragment>
  );
};
