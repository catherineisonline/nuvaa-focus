"use client";
import "./page.css";
import React, { useEffect, useRef, useState } from "react";
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

export default function Page() {
  const dispatch = useDispatch();

  const isTasksActive = useSelector((state) => state.navigation.isTasksActive);
  const isSettingsActive = useSelector(
    (state) => state.navigation.isSettingsActive
  );
  const isMusicActive = useSelector((state) => state.navigation.isMusicActive);

  // tasks
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  //other
  const [streak, setStreak] = useState(0);
  const [currentTab, setCurrentTab] = useState("focusTime");
  // stopwatch
  const [timeLeftStopwatch, setTimeLeftStopwatch] = useState(0);
  const [stopwatchIsRunning, setStopwatchIsRunning] = useState(false);
  // localStorage

  useEffect(() => {
    const streakStore = localStorage.getItem("streak");
    const settingsStore = localStorage.getItem("settings");
    const tabStore = localStorage.getItem("currentTab");
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
      setTasks(JSON.parse(tasksStore));
    }
    const currentTaskStore = localStorage.getItem("currentTask");
    if (currentTaskStore !== null) {
      setCurrentTask(JSON.parse(currentTaskStore));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("currentTab", JSON.stringify(currentTab));
  }, [currentTab]);
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("currentTask", JSON.stringify(currentTask));
  }, [tasks, currentTask]);

  // stopwatch actions
  const stopwatchRef = useRef(null);
  useEffect(() => {
    if (stopwatchIsRunning) {
      stopwatchRef.current = setInterval(() => {
        setTimeLeftStopwatch((prev) => {
          return prev + 1;
        });
      }, 1000);
    } else {
      clearInterval(stopwatchRef.current);
    }

    return () => clearInterval(stopwatchRef.current);
  }, [stopwatchIsRunning, timeLeftStopwatch]);

  const toggleStopwatch = () => {
    setStopwatchIsRunning(!stopwatchIsRunning);
  };
  const resetStopwatch = () => {
    setStopwatchIsRunning(false);
    setTimeLeftStopwatch(settings["stopwatch"]);
  };
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
          <Focus formatTime={formatTime} currentTask={currentTask} />
        ) : currentTab === "stopwatch" ? (
          <StopWatch
            formatTime={formatTime}
            timeLeftStopwatch={timeLeftStopwatch}
            toggleStopwatch={toggleStopwatch}
            stopwatchIsRunning={stopwatchIsRunning}
            resetStopwatch={resetStopwatch}
          />
        ) : (
          <Clock />
        )}
      </main>
      {isSettingsActive && <SettingsModal />}
      {isTasksActive && (
        <TaskModal
          tasks={tasks}
          setTasks={setTasks}
          currentTask={currentTask}
          setCurrentTask={setCurrentTask}
        />
      )}
      {isMusicActive && <MusicModal />}
    </div>
  );
}
