"use client";

import "./page.css";
import React, { useEffect } from "react";
import Header from "./components/header/Header";
import SettingsModal from "./components/settings-modal/SettingsModal";
import TaskModal from "./components/task-modal/TaskModal";
import MusicModal from "./components/music-modal/MusicModal";
import Focus from "./components/home/Focus";
import StopWatch from "./components/home/Stopwatch";
import Clock from "./components/home/Clock";
import { useDispatch, useSelector } from "react-redux";
import { setupSettings } from "./redux/slices/settingsSlice";
import { stopPomodoro } from "./redux/slices/pomodoroSlice";
import { initTasks, setCurrentTaskId } from "./redux/slices/tasksSlice";
import { tasksSelectors } from "./redux/selectors/tasksSelectors";
import { initStreak, setCurrentTab } from "./redux/slices/appSlice";

export default function Page() {
  const dispatch = useDispatch();

  const isTasksActive = useSelector((state) => state.navigation.isTasksActive);
  const isSettingsActive = useSelector(
    (state) => state.navigation.isSettingsActive
  );
  const isMusicActive = useSelector((state) => state.navigation.isMusicActive);
  const streak = useSelector((state) => state.app.streak);
  const currentTab = useSelector((state) => state.app.currentTab);
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

  useEffect(() => {
    if (currentTab !== "focusTime") dispatch(stopPomodoro());
  }, [currentTab, dispatch]);

  const updateTab = (tab) => {
    dispatch(setCurrentTab({ tab: tab }));
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div>
      <div className="background-overlay"></div>
      <Header />
      <main className="main-content">
        <div className="mode-tabs">
          <button
            className={`mode-tab ${currentTab === "focusTime" ? "active" : ""}`}
            onClick={() => updateTab("focusTime")}>
            Focus
          </button>
          <button
            className={`mode-tab ${currentTab === "stopwatch" ? "active" : ""}`}
            onClick={() => updateTab("stopwatch")}>
            Stopwatch
          </button>
          <button
            className={`mode-tab ${currentTab === "clock" ? "active" : ""}`}
            onClick={() => updateTab("clock")}>
            Clock
          </button>
        </div>
        {currentTab === "focusTime" ? (
          <Focus formatTime={formatTime} />
        ) : currentTab === "stopwatch" ? (
          <StopWatch formatTime={formatTime} />
        ) : (
          <Clock />
        )}
      </main>
      {isSettingsActive && <SettingsModal />}
      {isTasksActive && <TaskModal />}
      {isMusicActive && <MusicModal />}
    </div>
  );
}
