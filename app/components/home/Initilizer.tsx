"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { tasksSelectors } from "../../redux/selectors/tasksSelectors";
import { useEffect } from "react";
import { setupSettings } from "../../redux/slices/settingsSlice";
import { initStreak, setCurrentTab } from "../../redux/slices/appSlice";
import { initTasks, setCurrentTaskId } from "../../redux/slices/tasksSlice";

export const Initilizer = () => {
  const dispatch = useDispatch();

  const streak = useSelector((state: RootState) => state.app.streak);
  const currentTab = useSelector((state: RootState) => state.app.currentTab);
  const { tasks, currentTaskId } = useSelector(tasksSelectors);

  useEffect(() => {
    const streakStore = localStorage.getItem("streak");
    const settingsStore = localStorage.getItem("settings");
    const tabStore = localStorage.getItem("currentTab");
    const currentTaskStore = localStorage.getItem("currentTaskId");
    const tasksStore = localStorage.getItem("tasks");
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
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("currentTab", JSON.stringify(currentTab));
    localStorage.setItem("streak", JSON.stringify(streak));
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("currentTaskId", JSON.stringify(currentTaskId));
  }, [currentTab, streak, tasks, currentTaskId]);

  return null;
};
