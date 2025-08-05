"use client";
import { useDispatch, useSelector } from "react-redux";
import {
  CurrentQuote,
  CurrentQuoteWarning,
  QuoteGroup,
  QuoteTextArea,
  SectionHeading,
  SettingGroup,
  SettingsContent,
} from "./Features.styled";

import {
  setCurrentQuote,
  setCustomQuote,
  showQuotes,
} from "../../../redux/slices/quotesSlice";
import { RootState } from "../../../redux/store";
import { useCallback, useEffect } from "react";
import { CheckboxLabel } from "../timer-tab/Timer.styled";
import { RefreshCw, Trash } from "lucide-react";

export const FeaturesTab = () => {
  const dispatch = useDispatch();
  const isQuotesShown = useSelector(
    (state: RootState) => state.quotes.isQuotesShown
  );
  const customQuote = useSelector(
    (state: RootState) => state.quotes.customQuote
  );
  const currentQuote = useSelector(
    (state: RootState) => state.quotes.currentQuote
  );

  const quotes = useSelector((state: RootState) => state.quotes.quotes);

  const handleShowQuotes = () => {
    dispatch(showQuotes());
  };
  const handleCustomQuote = (val: string) => {
    dispatch(setCustomQuote({ value: val }));
  };

  const pickRandomQuote = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    dispatch(setCurrentQuote({ index: randomIndex }));
  }, [quotes, dispatch]);

  useEffect(() => {
    pickRandomQuote();
    const interval = setInterval(() => {
      pickRandomQuote();
    }, 25 * 60 * 1000);
    return () => clearInterval(interval);
  }, [dispatch, quotes, pickRandomQuote]);
  return (
    <SettingsContent>
      <SettingGroup>
        <SectionHeading>Motivational Quotes</SectionHeading>
        <CheckboxLabel htmlFor="showQuote">
          <input
            id="showQuote"
            type="checkbox"
            checked={isQuotesShown}
            onChange={handleShowQuotes}
          />
          Show motivational quotes
        </CheckboxLabel>
      </SettingGroup>
      {isQuotesShown && currentQuote && (
        <SettingGroup>
          <SectionHeading>Here is a random quote:</SectionHeading>
          <QuoteGroup>
            <CurrentQuote>&quot;{currentQuote}&quot;</CurrentQuote>
            <button
              onClick={pickRandomQuote}
              type="button"
              aria-label="Generate random quote">
              <RefreshCw />
            </button>
          </QuoteGroup>
        </SettingGroup>
      )}
      {customQuote && (
        <CurrentQuoteWarning>
          To enable random quotes, remove your custom quote
        </CurrentQuoteWarning>
      )}
      {isQuotesShown && (
        <SettingGroup>
          <SectionHeading>Custom Quote (optional)</SectionHeading>
          <QuoteTextArea
            value={customQuote || ""}
            onChange={(e) => handleCustomQuote(e.target.value)}
            placeholder="Enter your custom motivational quote..."
            rows={3}
          />
          {isQuotesShown && customQuote && (
            <SettingGroup>
              <SectionHeading>Here is your quote:</SectionHeading>
              <QuoteGroup>
                <CurrentQuote>&quot;{customQuote}&quot;</CurrentQuote>
                <button
                  onClick={() => handleCustomQuote("")}
                  type="button"
                  aria-label="Generate random quote">
                  <Trash />
                </button>
              </QuoteGroup>
            </SettingGroup>
          )}
        </SettingGroup>
      )}
    </SettingsContent>
  );
};
