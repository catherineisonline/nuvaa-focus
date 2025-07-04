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
import { useSelector } from "react-redux";

export default function Page() {
  //settings
  const [settings, setSettings] = useState({
    focusTime: 25,
    shortBreakTime: 5,
    longBreakTime: 15,
    stopwatch: 0,
    is24Hour: true,
    autoStartNext: false,
  });
  // pomodoro
  const [pomodoroSettings, setPomodoroSettings] = useState({
    pomodoroCount: 0,
    timeLeft: settings["focusTime"],
    isRunning: false,
    progress: 0,
  });
  // tasks
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);

  //other
  const [streak, setStreak] = useState(0);
  const [currentMode, setCurrentMode] = useState("focusTime");
  const [currentTab, setCurrentTab] = useState("focusTime");
  // stopwatch
  const [timeLeftStopwatch, setTimeLeftStopwatch] = useState(
    settings["stopwatch"]
  );
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
      setSettings(JSON.parse(settingsStore));
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
      focusTime: settings.focusTime * 60,
      shortBreakTime: settings.shortBreakTime * 60,
      longBreakTime: settings.longBreakTime * 60,
    };

    setPomodoroSettings((prev) => ({ ...prev, timeLeft: times[currentMode] }));
  }, [
    settings.focusTime,
    settings.shortBreakTime,
    settings.longBreakTime,
    currentMode,
  ]);

  // pomodoro actions
  const completedRef = useRef(false);
  useEffect(() => {
    if (pomodoroSettings.isRunning) {
      completedRef.current = false;
    }
  }, [pomodoroSettings.isRunning]);

  const handlePomodoroComplete = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;

    setPomodoroSettings((prev) => ({ ...prev, isRunning: false }));
    if (currentMode === "focusTime") {
      setPomodoroSettings((prev) => ({
        ...prev,
        pomodoroCount: prev.pomodoroCount + 1,
      }));
      setStreak((prev) => {
        const streak = prev + 1;
        localStorage.setItem("streak", JSON.stringify(streak));
        return streak;
      });

      const mode =
        (pomodoroSettings.pomodoroCount + 1) % 4 === 0
          ? "longBreakTime"
          : "shortBreakTime";
      setCurrentMode(mode);
      setPomodoroSettings((prev) => ({ ...prev, timeLeft: settings[mode] }));
    } else {
      setCurrentMode("focusTime");
      setPomodoroSettings((prev) => ({
        ...prev,
        timeLeft: settings["focusTime"],
      }));
    }
    // ! note: enable user add aut-start time & add countdown before autostart
    if (settings.autoStartNext) {
      setTimeout(
        () => setPomodoroSettings((prev) => ({ ...prev, isRunning: true })),
        3000
      );
    }
  }, [currentMode, pomodoroSettings.pomodoroCount, settings]);

  const intervalRef = useRef(null);

  useEffect(() => {
    if (!pomodoroSettings.isRunning) return;
    intervalRef.current = setInterval(() => {
      setPomodoroSettings((prev) => {
        const newTimeLeft = prev.timeLeft <= 1 ? 0 : prev.timeLeft - 1;

        if (prev.timeLeft <= 1) {
          handlePomodoroComplete();
        }
        return {
          ...prev,
          timeLeft: newTimeLeft,
        };
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [pomodoroSettings.isRunning, handlePomodoroComplete]);

  useEffect(() => {
    const totalTime = {
      focusTime: settings.focusTime * 60,
      shortBreakTime: settings.shortBreakTime * 60,
      longBreakTime: settings.longBreakTime * 60,
    }[currentMode];
    if (!totalTime) return;
    const progressT =
      ((totalTime - pomodoroSettings.timeLeft) / totalTime) * 100;
    setPomodoroSettings((prev) => ({ ...prev, progress: progressT }));
  }, [settings, currentMode, pomodoroSettings.timeLeft]);

  const circumference = 2 * Math.PI * 180;
  const strokeDashoffset =
    circumference * (1 - pomodoroSettings.progress / 100);

  const togglePomodoro = () => {
    setPomodoroSettings((prev) => ({ ...prev, isRunning: !prev.isRunning }));
  };
  const skipPomodoro = () => {
    setPomodoroSettings((prev) => ({ ...prev, isRunning: false }));
    if (currentMode === "focusTime") {
      setPomodoroSettings((prev) => ({
        ...prev,
        pomodoroCount: prev.pomodoroCount + 1,
      }));
      const mode =
        (pomodoroSettings.pomodoroCount + 1) % 4 === 0
          ? "longBreakTime"
          : "shortBreakTime";
      setCurrentMode(mode);
      setPomodoroSettings((prev) => ({ ...prev, timeLeft: settings[mode] }));
    } else {
      setCurrentMode("focusTime");
      setPomodoroSettings((prev) => ({
        ...prev,
        timeLeft: settings["focusTime"],
      }));
    }
  };
  const resetPomodoro = () => {
    setPomodoroSettings((prev) => ({ ...prev, isRunning: false }));
    const totalTime = {
      focusTime: settings.focusTime * 60,
      shortBreakTime: settings.shortBreakTime * 60,
      longBreakTime: settings.longBreakTime * 60,
    }[currentMode];
    setPomodoroSettings((prev) => ({
      ...prev,
      timeLeft: totalTime,
    }));
  };

  //clock
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    const formatTime = () => {
      return new Date().toLocaleTimeString("en-US", {
        hour12: !settings.is24Hour,
        hour: settings.is24Hour ? "2-digit" : "numeric",
        minute: "2-digit",
        second: "2-digit",
      });
    };

    const interval = setInterval(() => {
      setDateTime(formatTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [settings.is24Hour]);

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
    if (currentTab !== "focusTime")
      setPomodoroSettings((prev) => ({ ...prev, isRunning: false }));
  }, [currentTab]);

  const isTasksActive = useSelector((state) => state.navigation.isTasksActive);
  const isSettingsActive = useSelector(
    (state) => state.navigation.isSettingsActive
  );
  const isMusicActive = useSelector((state) => state.navigation.isMusicActive);
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
            timeLeft={pomodoroSettings.timeLeft}
            circumference={circumference}
            strokeDashoffset={strokeDashoffset}
            togglePomodoro={togglePomodoro}
            isRunning={pomodoroSettings.isRunning}
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
      {isSettingsActive && (
        <SettingsModal setSettings={setSettings} settings={settings} />
      )}
      {isTasksActive && (
        <TaskModal
          tasks={tasks}
          setTasks={setTasks}
          currentTask={currentTask}
          setCurrentTask={setCurrentTask}
          setSettings={setSettings}
          settings={settings}
        />
      )}
      {isMusicActive && (
        <MusicModal setSettings={setSettings} settings={settings} />
      )}
    </div>
  );
}
