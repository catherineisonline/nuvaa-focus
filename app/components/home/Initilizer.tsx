"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { tasksSelectors } from "../../redux/selectors/tasksSelectors";
import { useEffect, useState } from "react";
import { initSettings, updateSettings } from "../../redux/slices/settingsSlice";
import { initStreak, setCurrentTab } from "../../redux/slices/appSlice";
import { initTasks, setCurrentTaskId } from "../../redux/slices/tasksSlice";
import { initilizecustomBackgrounds, setCurrentBackground } from "../../redux/slices/appearanceSlice";
import { initilizeIsQuotesShown, setCurrentQuote, setCustomQuote } from "../../redux/slices/quotesSlice";
import { setMusicEnabled, setMusicUrl, setSelectedOption } from "../../redux/slices/musicSlice";
import { setOnboarding } from "../../redux/slices/onboardingSlice";
import { appearanceSelectors } from "../../redux/selectors/appearanceSelectors";
import { settingsSelectors } from "../../redux/selectors/settingsSelectors";
import { musicSelectors } from "../../redux/selectors/musicSelectors";
import { quoteSelectors } from "../../redux/selectors/quoteSelectors";

export const Initilizer = () => {
  const dispatch = useDispatch();
  const [hydrated, setHydrated] = useState(false);

  const streak = useSelector((state: RootState) => state.app.streak);
  const currentTab = useSelector((state: RootState) => state.app.currentTab);
  const { is24Hour, focusTime, shortBreakTime, longBreakTime, autoStartNext } = useSelector(settingsSelectors);
  const { tasks, currentTaskId } = useSelector(tasksSelectors);
  const { currentBackground, customBackgrounds } = useSelector(appearanceSelectors);
  const { selectedOption, musicEnabled, musicUrl } = useSelector(musicSelectors);
  const { isQuotesShown, customQuote } = useSelector(quoteSelectors);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      dispatch(setOnboarding(true));
      localStorage.setItem("hasVisited", "true");
    }
  }, [dispatch]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const focusTimeStore = localStorage.getItem("focus");
    const shortBreakTimeStore = localStorage.getItem("shortBreakTime");
    const longBreakTimeStore = localStorage.getItem("longBreakTime");
    const autoStartNextStore = localStorage.getItem("autoStartNext");
    const streakStore = localStorage.getItem("streak");
    const settingsStore = localStorage.getItem("settings");
    const currentTabStore = localStorage.getItem("currentTab");
    const is24HourStore = localStorage.getItem("is24Hour");
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

    if (focusTimeStore) {
      dispatch(updateSettings({ key: "focus", value: JSON.parse(focusTimeStore) }));
    }
    if (shortBreakTimeStore) {
      dispatch(updateSettings({ key: "shortBreakTime", value: JSON.parse(shortBreakTimeStore) }));
    }
    if (longBreakTimeStore) {
      dispatch(updateSettings({ key: "longBreakTime", value: JSON.parse(longBreakTimeStore) }));
    }
    if (autoStartNextStore) {
      dispatch(updateSettings({ key: "autoStartNext", value: JSON.parse(autoStartNextStore) }));
    }

    if (is24HourStore) {
      dispatch(updateSettings({ key: Number(JSON.parse(is24HourStore)) }));
    }
    if (streakStore !== null) {
      dispatch(initStreak(JSON.parse(streakStore)));
    }
    if (settingsStore !== null) {
      dispatch(initSettings(JSON.parse(settingsStore)));
    }
    if (currentTabStore !== null) {
      dispatch(setCurrentTab(JSON.parse(currentTabStore)));
    }
    if (tasksStore !== null) {
      dispatch(initTasks(JSON.parse(tasksStore)));
    }
    if (currentTaskStore !== null) {
      dispatch(setCurrentTaskId(JSON.parse(currentTaskStore)));
    }
    if (currentBackgroundStore !== null) {
      dispatch(setCurrentBackground(JSON.parse(currentBackgroundStore)));
    }
    if (customBackgroundsStore !== null) {
      dispatch(initilizecustomBackgrounds(JSON.parse(customBackgroundsStore)));
    }
    if (isQuotesShownStore !== null) {
      dispatch(initilizeIsQuotesShown(JSON.parse(isQuotesShownStore)));
    }
    if (quoteIndexStore !== null) {
      dispatch(setCurrentQuote(JSON.parse(quoteIndexStore)));
    }
    if (customQuoteStore !== null) {
      dispatch(setCustomQuote(JSON.parse(customQuoteStore)));
    }
    if (selectedOptionStore !== null) {
      dispatch(setSelectedOption(JSON.parse(selectedOptionStore)));
    }
    if (musicUrlStore !== null) {
      dispatch(setMusicUrl(JSON.parse(musicUrlStore)));
    }
    if (musicEnabledStore !== null) {
      dispatch(setMusicEnabled(JSON.parse(musicEnabledStore)));
    }
    setHydrated(true);
  }, [dispatch]);

  useEffect(() => {
    if (!hydrated) return;

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
    localStorage.setItem("currentTab", JSON.stringify(currentTab));
    localStorage.setItem("is24Hour", JSON.stringify(is24Hour));

    localStorage.setItem("focus", JSON.stringify(focusTime));
    localStorage.setItem("shortBreakTime", JSON.stringify(shortBreakTime));
    localStorage.setItem("longBreakTime", JSON.stringify(longBreakTime));
    localStorage.setItem("autoStartNext", JSON.stringify(autoStartNext));
  }, [
    shortBreakTime,
    focusTime,
    longBreakTime,
    autoStartNext,
    currentTab,
    is24Hour,
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
    hydrated,
  ]);

  return null;
};
