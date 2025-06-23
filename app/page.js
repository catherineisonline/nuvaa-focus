"use client";

import React, { act, useCallback, useEffect, useRef, useState } from "react";
import Header from "./components/header/Header";
import SettingsModal from "./components/settings-modal/SettingsModal";
import TaskModal from "./components/task-modal/TaskModal";
import MusicModal from "./components/music-modal/MusicModal";
import "./page.css";
import Focus from "./components/home/Focus";
import StopWatch from "./components/home/Stopwatch";
import Clock from "./components/home/Clock";

export const TIMER_MODES = {
  FOCUS: "focus",
  SHORT_BREAK: "short_break",
  LONG_BREAK: "long_break",
  STOPWATCH: "stopwatch",
};
export const DEFAULT_TIMES = {
  [TIMER_MODES.FOCUS]: 0.1 * 60,
  [TIMER_MODES.SHORT_BREAK]: 0.1 * 60,
  [TIMER_MODES.LONG_BREAK]: 15 * 60,
  [TIMER_MODES.STOPWATCH]: 0,
};

export default function Page() {
  // navigation
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showTasks, setShowTasks] = useState(false);
  const [showMusic, setShowMusic] = useState(false);
  // pomodoro
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(DEFAULT_TIMES[TIMER_MODES.FOCUS]);
  const [isRunning, setIsRunning] = useState(false);
  const [streak, setStreak] = useState(0);
  //other
  const [settings, setSettings] = useState({
    focusTime: 0.1,
    shortBreakTime: 0.1,
    longBreakTime: 15,
    is24Hour: false,
  });
  const [currentMode, setCurrentMode] = useState(TIMER_MODES.FOCUS);
  const [currentTab, setCurrentTab] = useState("focus");
  // stopwatch
  const [timeLeftStopwatch, setTimeLeftStopwatch] = useState(
    DEFAULT_TIMES[TIMER_MODES.STOPWATCH]
  );
  const [stopwatchIsRunning, setStopwatchIsRunning] = useState(false);

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
    if (currentMode === TIMER_MODES.FOCUS) {
      setPomodoroCount((prev) => prev + 1);
      setStreak((prev) => prev + 1);
      const mode =
        (pomodoroCount + 1) % 4 === 0
          ? TIMER_MODES.LONG_BREAK
          : TIMER_MODES.SHORT_BREAK;
      setCurrentMode(mode);
      setTimeLeft(DEFAULT_TIMES[mode]);
    } else {
      setCurrentMode(TIMER_MODES.FOCUS);
      setTimeLeft(DEFAULT_TIMES[TIMER_MODES.FOCUS]);
    }
  }, [currentMode, pomodoroCount]);

  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handlePomodoroComplete();

            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft, handlePomodoroComplete]);

  const getProgress = () => {
    const totalTime = {
      [TIMER_MODES.FOCUS]: settings.focusTime * 60,
      [TIMER_MODES.SHORT_BREAK]: settings.shortBreakTime * 60,
      [TIMER_MODES.LONG_BREAK]: settings.longBreakTime * 60,
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
    if (currentMode === TIMER_MODES.FOCUS) {
      setPomodoroCount((prev) => prev + 1);
      const mode =
        (pomodoroCount + 1) % 4 === 0
          ? TIMER_MODES.LONG_BREAK
          : TIMER_MODES.SHORT_BREAK;
      setCurrentMode(mode);
      setTimeLeft(DEFAULT_TIMES[mode]);
    } else {
      setCurrentMode(TIMER_MODES.FOCUS);
      setTimeLeft(DEFAULT_TIMES[TIMER_MODES.FOCUS]);
    }
  };
  const resetPomodoro = () => {
    setIsRunning(false);
    setTimeLeft(DEFAULT_TIMES[currentMode]);
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
    setTimeLeftStopwatch(DEFAULT_TIMES[TIMER_MODES.STOPWATCH]);
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
    if (currentTab !== "focus") setIsRunning(false);
  }, [currentTab, isRunning]);

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
            className={`mode-tab ${currentTab === "focus" ? "active" : ""}`}
            onClick={() => setCurrentTab("focus")}>
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
        {currentTab === "focus" ? (
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
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
      {showTasks && <TaskModal onClose={() => setShowTasks(false)} />}
      {showMusic && <MusicModal onClose={() => setShowMusic(false)} />}
    </div>
  );
}
