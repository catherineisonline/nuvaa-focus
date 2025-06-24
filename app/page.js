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

export default function Page() {
  //settings
  const [settings, setSettings] = useState({
    focusTime: 25,
    shortBreakTime: 5,
    longBreakTime: 15,
    stopwatch: 0,
    is24Hour: true,
  });
  // navigation
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showTasks, setShowTasks] = useState(false);
  const [showMusic, setShowMusic] = useState(false);
  // pomodoro
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(settings["focusTime"]);
  const [isRunning, setIsRunning] = useState(false);

  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const streakStore = localStorage.getItem("streak");
    const settingsStore = localStorage.getItem("settings");
    if (streakStore !== null) {
      setStreak(JSON.parse(streakStore));
    }
    if (settingsStore !== null) {
      setSettings(JSON.parse(settingsStore));
    }
  }, []);

  const [currentMode, setCurrentMode] = useState("focusTime");
  const [currentTab, setCurrentTab] = useState("focusTime");
  // stopwatch
  const [timeLeftStopwatch, setTimeLeftStopwatch] = useState(
    settings["stopwatch"]
  );
  const [stopwatchIsRunning, setStopwatchIsRunning] = useState(false);
  // settings
  useEffect(() => {
    const times = {
      focusTime: settings.focusTime * 60,
      shortBreakTime: settings.shortBreakTime * 60,
      longBreakTime: settings.longBreakTime * 60,
    };
    setTimeLeft(times[currentMode]);
  }, [
    settings.focusTime,
    settings.shortBreakTime,
    settings.longBreakTime,
    currentMode,
  ]);

  // modal actions
  const toggleFullscreen = () => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
    setIsFullscreen(!isFullscreen);
  };
  // pomodoro actions
  const completedRef = useRef(false);
  useEffect(() => {
    if (isRunning) {
      completedRef.current = false;
    }
  }, [isRunning]);

  const handlePomodoroComplete = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    setIsRunning(false);
    if (currentMode === "focusTime") {
      setPomodoroCount((prev) => prev + 1);

      setStreak((prev) => {
        const streak = prev + 1;
        localStorage.setItem("streak", JSON.stringify(streak));
        return streak;
      });

      const mode =
        (pomodoroCount + 1) % 4 === 0 ? "longBreakTime" : "shortBreakTime";
      setCurrentMode(mode);
      setTimeLeft(settings[mode]);
    } else {
      setCurrentMode("focusTime");
      setTimeLeft(settings["focusTime"]);
    }
  }, [currentMode, pomodoroCount, settings]);

  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isRunning) return;
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handlePomodoroComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isRunning, handlePomodoroComplete]);

  const getProgress = () => {
    const totalTime = {
      focusTime: settings.focusTime * 60,
      shortBreakTime: settings.shortBreakTime * 60,
      longBreakTime: settings.longBreakTime * 60,
    }[currentMode];

    return ((totalTime - timeLeft) / totalTime) * 100;
  };

  const progress = getProgress();
  const circumference = 2 * Math.PI * 180;
  const strokeDashoffset = circumference * (1 - progress / 100);
  const togglePomodoro = () => {
    setIsRunning(!isRunning);
  };
  const skipPomodoro = () => {
    setIsRunning(false);
    if (currentMode === "focusTime") {
      setPomodoroCount((prev) => prev + 1);
      const mode =
        (pomodoroCount + 1) % 4 === 0 ? "longBreakTime" : "shortBreakTime";
      setCurrentMode(mode);
      setTimeLeft(settings[mode]);
    } else {
      setCurrentMode("focusTime");
      setTimeLeft(settings["focusTime"]);
    }
  };
  const resetPomodoro = () => {
    setIsRunning(false);
    const totalTime = {
      focusTime: settings.focusTime * 60,
      shortBreakTime: settings.shortBreakTime * 60,
      longBreakTime: settings.longBreakTime * 60,
    }[currentMode];
    setTimeLeft(totalTime);
  };

  //clock
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const formatTime = () => {
      const now = new Date();
      return now.toLocaleTimeString("en-US", {
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
    if (currentTab !== "focusTime") setIsRunning(false);
  }, [currentTab]);

  return (
    <div>
      <div className="background-overlay"></div>
      <Header
        toggleFullscreen={toggleFullscreen}
        setShowTasks={setShowTasks}
        setShowMusic={setShowMusic}
        setShowSettings={setShowSettings}
        streak={streak}
      />
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
            currentMode={currentMode}
            formatTime={formatTime}
            timeLeft={timeLeft}
            circumference={circumference}
            strokeDashoffset={strokeDashoffset}
            togglePomodoro={togglePomodoro}
            isRunning={isRunning}
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
      {showSettings && (
        <SettingsModal
          setShowSettings={setShowSettings}
          setSettings={setSettings}
          settings={settings}
        />
      )}
      {showTasks && (
        <TaskModal
          setShowSettings={setShowSettings}
          setSettings={setSettings}
          settings={settings}
        />
      )}
      {showMusic && (
        <MusicModal
          setShowSettings={setShowSettings}
          setSettings={setSettings}
          settings={settings}
        />
      )}
    </div>
  );
}
