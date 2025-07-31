"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import {
  setCustomQuote,
  setIsEditingQuote,
  setTempCustomQuote,
} from "../../../redux/slices/quotesSlice";

import { QuoteDisplay, QuoteDisplayText, QuoteSection } from "./Quote.styled";
import { useBackgroundStatus } from "../../../hooks/useBackgroundStatus";

export const Quotes = () => {
  const dispatch = useDispatch();
  const isBackgroundActive = useBackgroundStatus();
  const isQuotesShown = useSelector(
    (state: RootState) => state.quotes.isQuotesShown
  );
  // const isEditingQuote = useSelector(
  //   (state: RootState) => state.quotes.isEditingQuote
  // );
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
  };
  const handleTempQuote = (val: string) => {
    dispatch(setTempCustomQuote({ value: val }));
  };
  const handleCustomQuote = () => {
    dispatch(setCustomQuote({ value: tempCustomQuote }));
  };
  return (
    <QuoteSection>
      {isQuotesShown && (
        <QuoteDisplayText
          $bgImage={isBackgroundActive}
          contentEditable={true}
          suppressContentEditableWarning={true}
          onInput={(e) => handleTempQuote((e.target as HTMLElement).innerText)}
          onBlur={handleCustomQuote}
          aria-label="Edit quote">
          {customQuote || currentQuote}
        </QuoteDisplayText>
      )}
    </QuoteSection>
  );
};
