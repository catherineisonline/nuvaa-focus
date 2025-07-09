"use client";
import "./page.css";
import React, { useEffect, useState } from "react";
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

export default function Page() {
  const dispatch = useDispatch();

  const isTasksActive = useSelector((state) => state.navigation.isTasksActive);
  const isSettingsActive = useSelector(
    (state) => state.navigation.isSettingsActive
  );
  const isMusicActive = useSelector((state) => state.navigation.isMusicActive);

  //other
  const [streak, setStreak] = useState(0);
  const [currentTab, setCurrentTab] = useState("focusTime");
  // localStorage
  const tasks = useSelector((state) => state.tasks.tasks);
  const currentTaskId = useSelector((state) => state.tasks.currentTaskId);

  useEffect(() => {
    const streakStore = localStorage.getItem("streak");
    const settingsStore = localStorage.getItem("settings");
    const tabStore = localStorage.getItem("currentTab");
    const currentTaskStore = localStorage.getItem("currentTaskId");

    if (streakStore !== null) {
      setStreak(JSON.parse(streakStore));
    }
    if (settingsStore !== null) {
      dispatch(setupSettings(JSON.parse(settingsStore)));
    }
    if (tabStore !== null) {
      setCurrentTab(JSON.parse(tabStore));
    }
    const tasksStore = localStorage.getItem("tasks");
    if (tasksStore !== null) {
      dispatch(initTasks(JSON.parse(tasksStore)));
    }
    if (currentTaskStore !== null) {
      dispatch(setCurrentTaskId({ id: JSON.parse(currentTaskStore) }));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("currentTab", JSON.stringify(currentTab));
  }, [currentTab]);
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("currentTaskId", JSON.stringify(currentTaskId));
  }, [tasks, currentTaskId]);

  // other
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };
  useEffect(() => {
    if (currentTab !== "focusTime") dispatch(stopPomodoro());
  }, [currentTab, dispatch]);

  return (
    <div>
      <div className="background-overlay"></div>
      <Header streak={streak} />
      <main className="main-content">
        <div className="mode-tabs">
          <button
            className={`mode-tab ${currentTab === "focusTime" ? "active" : ""}`}
            onClick={() => setCurrentTab("focusTime")}>
            Focus
          </button>
          <button
            className={`mode-tab ${currentTab === "stopwatch" ? "active" : ""}`}
            onClick={() => setCurrentTab("stopwatch")}>
            Stopwatch
          </button>
          <button
            className={`mode-tab ${currentTab === "clock" ? "active" : ""}`}
            onClick={() => setCurrentTab("clock")}>
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
