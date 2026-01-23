"use client";
import { useDispatch, useSelector } from "react-redux";
import {
  Checkbox,
  CheckboxLabel,
  Checkmark,
  CurrentQuote,
  CurrentQuoteWarning,
  QuoteGroup,
  QuoteTextArea,
  RandomQuoteButton,
  SectionHeading,
  SettingGroup,
  SettingsContent,
} from "./Features.styled";

import { setCurrentQuote, setCustomQuote, showQuotes } from "../../../redux/slices/quotesSlice";
import { useCallback, useEffect } from "react";

import Shuffle from "lucide-react/dist/esm/icons/shuffle";
import { quoteSelectors } from "../../../redux/selectors/quoteSelectors";

export const FeaturesTab = () => {
  const dispatch = useDispatch();
  const { isQuotesShown, customQuote, currentQuote, quotes } = useSelector(quoteSelectors);
  const handleShowQuotes = () => {
    dispatch(showQuotes());
  };
  const handleCustomQuote = (val: string) => {
    dispatch(setCustomQuote(val));
  };

  const pickRandomQuote = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    localStorage.setItem("quoteIndex", JSON.stringify(randomIndex));

    dispatch(setCurrentQuote(randomIndex));
  }, [quotes, dispatch]);

  useEffect(() => {
    pickRandomQuote();
    const interval = setInterval(
      () => {
        pickRandomQuote();
      },
      25 * 60 * 1000,
    );
    return () => clearInterval(interval);
  }, [dispatch, quotes, pickRandomQuote]);
  return (
    <SettingsContent>
      <SettingGroup>
        <SectionHeading>Motivational Quotes</SectionHeading>
        <CheckboxLabel htmlFor="showQuote">
          <Checkbox id="showQuote" type="checkbox" checked={isQuotesShown} onChange={handleShowQuotes} />
          <Checkmark></Checkmark>
          Show motivational quotes
        </CheckboxLabel>
      </SettingGroup>
      {isQuotesShown && currentQuote && (
        <SettingGroup>
          <SectionHeading>Here is a random quote:</SectionHeading>
          <QuoteGroup>
            <CurrentQuote>&quot;{currentQuote}&quot;</CurrentQuote>
            <RandomQuoteButton onClick={pickRandomQuote} type="button" aria-label="Generate random quote">
              Show me another quote
              <Shuffle />
            </RandomQuoteButton>
          </QuoteGroup>
        </SettingGroup>
      )}

      {customQuote && <CurrentQuoteWarning>To enable random quotes, remove your custom quote</CurrentQuoteWarning>}
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
              </QuoteGroup>
            </SettingGroup>
          )}
        </SettingGroup>
      )}
    </SettingsContent>
  );
};
