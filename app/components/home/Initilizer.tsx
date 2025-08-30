"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { tasksSelectors } from "../../redux/selectors/tasksSelectors";
import { useEffect } from "react";
import { setupSettings } from "../../redux/slices/settingsSlice";
import { initStreak, setCurrentTab } from "../../redux/slices/appSlice";
import { initTasks, setCurrentTaskId } from "../../redux/slices/tasksSlice";
import { initilizecustomBackgrounds, setCurrentBackground } from "../../redux/slices/appearanceSlice";
import { initilizeIsQuotesShown, setCurrentQuote, setCustomQuote } from "../../redux/slices/quotesSlice";
import { setMusicEnabled, setMusicUrl, setSelectedOption } from "../../redux/slices/musicSlice";
import { setOnboarding } from "../../redux/slices/onboardingSlice";
import { appearanceSelectors } from "../../redux/selectors/appearanceSelectors";

export const Initilizer = () => {
  const dispatch = useDispatch();

  const streak = useSelector((state: RootState) => state.app.streak);
  const currentTab = useSelector((state: RootState) => state.app.currentTab);

  const { tasks, currentTaskId } = useSelector(tasksSelectors);
  const { currentBackground, customBackgrounds } = useSelector(appearanceSelectors);

  const isQuotesShown = useSelector((state: RootState) => state.quotes.isQuotesShown);
  const customQuote = useSelector((state: RootState) => state.quotes.customQuote);
  const selectedOption = useSelector((state: RootState) => state.music.selectedOption);
  const musicEnabled = useSelector((state: RootState) => state.music.musicEnabled);
  const musicUrl = useSelector((state: RootState) => state.music.musicUrl);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      dispatch(setOnboarding({ value: true }));
      localStorage.setItem("hasVisited", "true");
    }
  }, [dispatch]);

  useEffect(() => {
    const streakStore = localStorage.getItem("streak");
    const settingsStore = localStorage.getItem("settings");
    const tabStore = localStorage.getItem("currentTab");
    const currentTaskStore = localStorage.getItem("currentTaskId");
    const tasksStore = localStorage.getItem("tasks");
    const currentBackgroundStore = localStorage.getItem("currentBackground");
    const customBackgroundsStore = localStorage.getItem("customBackgrounds");
    const isQuotesShownStore = localStorage.getItem("isQuotesShown");
    const quoteIndexStore = localStorage.getItem("quoteIndex");
    const customQuoteStore = localStorage.getItem("customQuote");
    const selectedOptionStore = localStorage.getItem("selectedOption");
    const musicUrlStore = localStorage.getItem("musicUrl");
    const musicEnabledStore = localStorage.getItem("musicEnabled");
    if (streakStore !== null) {
      dispatch(initStreak({ value: JSON.parse(streakStore) }));
    }
    if (settingsStore !== null) {
      dispatch(setupSettings(JSON.parse(settingsStore)));
    }
    if (tabStore !== null) {
      dispatch(setCurrentTab({ tab: JSON.parse(tabStore) }));
    }
    if (tasksStore !== null) {
      dispatch(initTasks(JSON.parse(tasksStore)));
    }
    if (currentTaskStore !== null) {
      dispatch(setCurrentTaskId({ id: JSON.parse(currentTaskStore) }));
    }
    if (currentBackgroundStore !== null) {
      dispatch(setCurrentBackground({ image: JSON.parse(currentBackgroundStore) }));
    }
    if (customBackgroundsStore !== null) {
      dispatch(initilizecustomBackgrounds({ data: JSON.parse(customBackgroundsStore) }));
    }
    if (isQuotesShownStore !== null) {
      dispatch(initilizeIsQuotesShown({ val: JSON.parse(isQuotesShownStore) }));
    }
    if (quoteIndexStore !== null) {
      dispatch(setCurrentQuote({ index: JSON.parse(quoteIndexStore) }));
    }
    if (customQuoteStore !== null) {
      dispatch(setCustomQuote({ value: JSON.parse(customQuoteStore) }));
    }
    if (selectedOptionStore !== null) {
      dispatch(setSelectedOption({ value: JSON.parse(selectedOptionStore) }));
    }
    if (musicUrlStore !== null) {
      dispatch(setMusicUrl({ value: JSON.parse(musicUrlStore) }));
    }
    if (musicEnabledStore !== null) {
      dispatch(setMusicEnabled({ value: JSON.parse(musicEnabledStore) }));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("currentTab", JSON.stringify(currentTab));
    localStorage.setItem("streak", JSON.stringify(streak));
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("currentTaskId", JSON.stringify(currentTaskId));
    localStorage.setItem("currentBackground", JSON.stringify(currentBackground));
    localStorage.setItem("customBackgrounds", JSON.stringify(customBackgrounds));
    localStorage.setItem("isQuotesShown", JSON.stringify(isQuotesShown));
    localStorage.setItem("customQuote", JSON.stringify(customQuote));
    localStorage.setItem("selectedOption", JSON.stringify(selectedOption));
    localStorage.setItem("musicUrl", JSON.stringify(musicUrl));
    localStorage.setItem("musicEnabled", JSON.stringify(musicEnabled));
  }, [
    currentTab,
    streak,
    tasks,
    currentTaskId,
    currentBackground,
    customBackgrounds,
    isQuotesShown,
    customQuote,
    selectedOption,
    musicUrl,
    musicEnabled,
  ]);

  return null;
};
