"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { tasksSelectors } from "../../redux/selectors/tasksSelectors";
import { useEffect } from "react";
import { setupSettings } from "../../redux/slices/settingsSlice";
import { initStreak, setCurrentTab } from "../../redux/slices/appSlice";
import { initTasks, setCurrentTaskId } from "../../redux/slices/tasksSlice";
import {
  initilizecustomBackgrounds,
  setCurrentBackground,
} from "../../redux/slices/appearanceSlice";
import {
  initilizeIsQuotesShown,
  setCurrentQuote,
  setCustomQuote,
} from "../../redux/slices/quotesSlice";

export const Initilizer = () => {
  const dispatch = useDispatch();

  const streak = useSelector((state: RootState) => state.app.streak);
  const currentTab = useSelector((state: RootState) => state.app.currentTab);

  const { tasks, currentTaskId } = useSelector(tasksSelectors);
  const currentBackground = useSelector(
    (state: RootState) => state.appearance.currentBackground
  );
  const customBackgrounds = useSelector(
    (state: RootState) => state.appearance.customBackgrounds
  );
  const isQuotesShown = useSelector(
    (state: RootState) => state.quotes.isQuotesShown
  );
  const customQuote = useSelector(
    (state: RootState) => state.quotes.customQuote
  );
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
      dispatch(
        setCurrentBackground({ image: JSON.parse(currentBackgroundStore) })
      );
    }
    if (customBackgroundsStore !== null) {
      dispatch(
        initilizecustomBackgrounds({ data: JSON.parse(customBackgroundsStore) })
      );
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
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("currentTab", JSON.stringify(currentTab));
    localStorage.setItem("streak", JSON.stringify(streak));
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("currentTaskId", JSON.stringify(currentTaskId));
    localStorage.setItem(
      "currentBackground",
      JSON.stringify(currentBackground)
    );
    localStorage.setItem(
      "customBackgrounds",
      JSON.stringify(customBackgrounds)
    );
    localStorage.setItem("isQuotesShown", JSON.stringify(isQuotesShown));
    localStorage.setItem("customQuote", JSON.stringify(customQuote));
  }, [
    currentTab,
    streak,
    tasks,
    currentTaskId,
    currentBackground,
    customBackgrounds,
    isQuotesShown,
    customQuote,
  ]);

  return null;
};
