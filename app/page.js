"use client";

import React, { useEffect, useRef, useState } from "react";
import Header from "./components/header/Header";
import SettingsModal from "./components/settings-modal/SettingsModal";
import TaskModal from "./components/task-modal/TaskModal";
import MusicModal from "./components/music-modal/MusicModal";
import { Pause, Play, SkipForward, RefreshCcw } from "lucide-react";
import "./page.css";

export const TIMER_MODES = {
  FOCUS: "focus",
  SHORT_BREAK: "short_break",
  LONG_BREAK: "long_break",
  COUNTDOWN: "timer",
};
export const DEFAULT_TIMES = {
  [TIMER_MODES.FOCUS]: 25 * 60,
  [TIMER_MODES.SHORT_BREAK]: 5 * 60,
  [TIMER_MODES.LONG_BREAK]: 15 * 60,
  [TIMER_MODES.TIMER]: 0,
};

export default function Page() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showTasks, setShowTasks] = useState(false);
  const [showMusic, setShowMusic] = useState(false);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [settings, setSettings] = useState({
    focusTime: 25,
    shortBreakTime: 5,
    longBreakTime: 15,
    is24Hour: false,
  });
  const [currentMode, setCurrentMode] = useState(TIMER_MODES.FOCUS);
  const [currentTab, setCurrentTab] = useState("focus");
  const [timeLeft, setTimeLeft] = useState(DEFAULT_TIMES[TIMER_MODES.FOCUS]);
  const [timeLeftTimer, setTimeLeftTimer] = useState(
    DEFAULT_TIMES[TIMER_MODES.TIMER]
  );
  const [timerIsRunning, setTimerIsRunning] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
    setIsFullscreen(!isFullscreen);
  };

  const handleTimerComplete = () => {
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
  const intervalRef = useRef(null);
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft]);

  const getProgress = () => {
    const totalTime = {
      [TIMER_MODES.FOCUS]: settings.focusTime * 60,
      [TIMER_MODES.SHORT_BREAK]: settings.shortBreakTime * 60,
      [TIMER_MODES.LONG_BREAK]: settings.longBreakTime * 60,
    }[currentMode];

    return ((totalTime - timeLeft) / totalTime) * 100;
  };
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

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

  const timerIntervalRef = useRef(null);
  useEffect(() => {
    if (timerIsRunning) {
      timerIntervalRef.current = setInterval(() => {
        setTimeLeftTimer((prev) => {
          return prev + 1;
        });
      }, 1000);
    } else {
      clearInterval(timerIntervalRef.current);
    }

    return () => clearInterval(timerIntervalRef.current);
  }, [timerIsRunning, timeLeftTimer]);
  const toggleCountdown = () => {
    setTimerIsRunning(!timerIsRunning);
  };
  const resetCountdown = () => {
    setTimerIsRunning(false);
    setTimeLeftTimer(DEFAULT_TIMES[TIMER_MODES.TIMER]);
  };
  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };
  const skipTimer = () => {
    handleTimerComplete();
  };
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(DEFAULT_TIMES[currentMode]);
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
      />
      <main className="main-content">
        <div className="mode-tabs">
          <button
            className={`mode-tab ${currentTab === "focus" ? "active" : ""}`}
            onClick={() => setCurrentTab("focus")}>
            Focus
          </button>
          <button
            className={`mode-tab ${currentTab === "timer" ? "active" : ""}`}
            onClick={() => setCurrentTab("timer")}>
            Countdown
          </button>
          <button
            className={`mode-tab ${currentTab === "clock" ? "active" : ""}`}
            onClick={() => setCurrentTab("clock")}>
            Clock
          </button>
        </div>
        <div className="timer-container">
          <div className="timer-circle">
            <svg className="progress-ring" width="300" height="300">
              <circle
                className="progress-ring-background"
                strokeWidth="8"
                fill="transparent"
                r="140"
                cx="150"
                cy="150"
              />
              {currentTab === "focus" && (
                <circle
                  className="progress-ring-progress"
                  strokeWidth="8"
                  fill="transparent"
                  r="140"
                  cx="150"
                  cy="150"
                  style={{
                    strokeDasharray: `${2 * Math.PI * 140}`,
                    strokeDashoffset: `${
                      2 * Math.PI * 140 * (1 - getProgress() / 100)
                    }`,
                  }}
                />
              )}
            </svg>

            <div className="timer-content">
              {currentTab === "focus" && (
                <React.Fragment>
                  <p className="mode-label">
                    {currentMode === "short_break"
                      ? "Short Break"
                      : currentMode === "long_break"
                      ? "Long Break"
                      : "Focus"}
                  </p>
                  <time className="timer-display">{formatTime(timeLeft)}</time>
                </React.Fragment>
              )}
              {currentTab === "timer" && (
                <React.Fragment>
                  <p className="mode-label">Countdown</p>
                  <time className="timer-display">
                    {formatTime(timeLeftTimer)}
                  </time>
                </React.Fragment>
              )}
              {currentTab === "clock" && (
                <React.Fragment>
                  <p className="mode-label">Current Time</p>
                  <time className="timer-display">{dateTime}</time>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
        {currentTab === "focus" && (
          <div className="timer-controls">
            <button
              className="control-button primary"
              onClick={toggleTimer}
              aria-label={isRunning ? "Pause" : "Start"}>
              <span>{isRunning ? "Pause" : "Start"}</span>
              {isRunning ? <Pause /> : <Play />}
            </button>
            <button
              className="control-button secondary"
              onClick={skipTimer}
              aria-label="Skip">
              <span>Skip</span>
              <SkipForward />
            </button>
            <button
              className="control-button secondary"
              onClick={resetTimer}
              aria-label="Reset">
              <span>Reset</span>
              <RefreshCcw />
            </button>
          </div>
        )}
        {currentTab === "timer" && (
          <div className="timer-controls">
            <button
              className="control-button primary"
              onClick={toggleCountdown}
              aria-label={timerIsRunning ? "Pause" : "Start"}>
              <span>{timerIsRunning ? "Pause" : "Start"}</span>
              {timerIsRunning ? <Pause /> : <Play />}
            </button>
            <button
              className="control-button secondary"
              onClick={resetCountdown}
              aria-label="Reset">
              <span>Reset</span>
              <RefreshCcw />
            </button>
          </div>
        )}
      </main>
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
      {showTasks && <TaskModal onClose={() => setShowTasks(false)} />}
      {showMusic && <MusicModal onClose={() => setShowMusic(false)} />}
    </div>
  );
}
