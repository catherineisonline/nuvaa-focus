"use client";
import "./page.css";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Header from "./components/header/Header";
import SettingsModal from "./components/settings-modal/SettingsModal";
import TaskModal from "./components/task-modal/TaskModal";
import MusicModal from "./components/music-modal/MusicModal";
import Focus from "./components/home/Focus";
import StopWatch from "./components/home/Stopwatch";
import Clock from "./components/home/Clock";
import { useDispatch, useSelector } from "react-redux";
import { setupSettings } from "./redux/settingsSlice";
import {
  stopPomodoro,
  timeTick,
  togglePomodoro,
  updateCount,
  updateMode,
  updateProgress,
  updateTimeLeft,
} from "./redux/pomodoroSlice";
import { pomodoroSelectors } from "./redux/selectors/pomodoroSelectors";
import { settingsSelectors } from "./redux/selectors/settingsSelectors";

export default function Page() {
  const dispatch = useDispatch();
  const isTasksActive = useSelector((state) => state.navigation.isTasksActive);
  const isSettingsActive = useSelector(
    (state) => state.navigation.isSettingsActive
  );
  const isMusicActive = useSelector((state) => state.navigation.isMusicActive);
  const {
    focusTime,
    shortBreakTime,
    longBreakTime,
    stopwatch,
    is24Hour,
    autoStartNext,
  } = useSelector(settingsSelectors);

  const { pomodoroCount, timeLeft, isRunning, progress, currentMode } =
    useSelector(pomodoroSelectors);
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
  // settings
  useEffect(() => {
    const times = {
      focusTime: focusTime * 60,
      shortBreakTime: shortBreakTime * 60,
      longBreakTime: longBreakTime * 60,
    };
    dispatch(updateTimeLeft({ time: times[currentMode] }));
  }, [dispatch, focusTime, shortBreakTime, longBreakTime, currentMode]);

  // pomodoro actions
  const completedRef = useRef(false);
  useEffect(() => {
    if (isRunning) {
      completedRef.current = false;
    }
  }, [isRunning]);
  const getMode = () => {
    return (pomodoroCount + 1) % 4 === 0 ? "longBreakTime" : "shortBreakTime";
  };
  const getModeTime = () => {
    const mode = getMode();
    return mode === "longBreakTime" ? longBreakTime : shortBreakTime;
  };
  const handlePomodoroComplete = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    dispatch(stopPomodoro());
    const modeTime = getModeTime();
    if (currentMode === "focusTime") {
      dispatch(updateCount());
      setStreak((prev) => {
        const streak = prev + 1;
        localStorage.setItem("streak", JSON.stringify(streak));
        return streak;
      });

      const mode = getMode();
      dispatch(updateMode({ mode: mode }));
      dispatch(updateTimeLeft({ time: modeTime }));
    } else {
      dispatch(updateMode({ mode: "focusTime" }));
      dispatch(updateTimeLeft({ time: modeTime }));
    }
    // ! note: enable user add aut-start time & add countdown before autostart
    if (autoStartNext) {
      setTimeout(
        () => dispatch(togglePomodoro()),

        3000
      );
    }
  }, [dispatch, currentMode, autoStartNext, pomodoroCount]);

  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isRunning) return;
    intervalRef.current = setInterval(() => {
      dispatch(timeTick());
      if (timeLeft <= 1) {
        handlePomodoroComplete();
      }
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [dispatch, timeLeft, isRunning, handlePomodoroComplete]);

  useEffect(() => {
    const totalTime = {
      focusTime: focusTime * 60,
      shortBreakTime: shortBreakTime * 60,
      longBreakTime: longBreakTime * 60,
    }[currentMode];
    if (!totalTime) return;
    const progressT = ((totalTime - timeLeft) / totalTime) * 100;
    dispatch(updateProgress({ time: progressT }));
  }, [
    dispatch,
    focusTime,
    shortBreakTime,
    longBreakTime,
    currentMode,
    timeLeft,
  ]);

  const circumference = 2 * Math.PI * 180;
  const strokeDashoffset = circumference * (1 - progress / 100);
  const skipPomodoro = () => {
    dispatch(stopPomodoro());
    const modeTime = getModeTime();
    if (currentMode === "focusTime") {
      dispatch(updateCount());
      const mode = getMode();
      dispatch(updateMode({ mode: mode }));
      dispatch(updateTimeLeft({ time: modeTime }));
    } else {
      dispatch(updateMode({ mode: "focusTime" }));
      dispatch(updateTimeLeft({ time: modeTime }));
    }
  };
  const resetPomodoro = () => {
    dispatch(stopPomodoro());
    const totalTime = {
      focusTime: focusTime * 60,
      shortBreakTime: shortBreakTime * 60,
      longBreakTime: longBreakTime * 60,
    }[currentMode];
    dispatch(updateTimeLeft({ time: totalTime }));
  };

  //clock
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    const formatTime = () => {
      return new Date().toLocaleTimeString("en-US", {
        hour12: !is24Hour,
        hour: is24Hour ? "2-digit" : "numeric",
        minute: "2-digit",
        second: "2-digit",
      });
    };

    const interval = setInterval(() => {
      setDateTime(formatTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [is24Hour]);

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
          <Focus
            currentTask={currentTask}
            currentMode={currentMode}
            formatTime={formatTime}
            circumference={circumference}
            strokeDashoffset={strokeDashoffset}
            skipPomodoro={skipPomodoro}
            resetPomodoro={resetPomodoro}
          />
        ) : currentTab === "stopwatch" ? (
          <StopWatch
            formatTime={formatTime}
            timeLeftStopwatch={timeLeftStopwatch}
            toggleStopwatch={toggleStopwatch}
            stopwatchIsRunning={stopwatchIsRunning}
            resetStopwatch={resetStopwatch}
          />
        ) : (
          <Clock dateTime={dateTime} />
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
