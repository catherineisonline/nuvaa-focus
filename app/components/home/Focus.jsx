import { usePomodoroMode } from "@/app/hooks/usePomodoroMode";
import { pomodoroSelectors } from "@/app/redux/selectors/pomodoroSelectors";
import { settingsSelectors } from "@/app/redux/selectors/settingsSelectors";
import { setStreak } from "@/app/redux/slices/appSlice";
import {
  stopPomodoro,
  timeTick,
  togglePomodoro,
  updateCount,
  updateMode,
  updateProgress,
  updateTimeLeft,
} from "@/app/redux/slices/pomodoroSlice";
import { Pause, Play, SkipForward, RefreshCcw } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const Focus = ({ formatTime }) => {
  const dispatch = useDispatch();
  const completedRef = useRef(false);
  const intervalRef = useRef(null);
  const { getMode, getModeTime } = usePomodoroMode();

  const { progress, currentMode, pomodoroCount } =
    useSelector(pomodoroSelectors);
  const { autoStartNext, focusTime, shortBreakTime, longBreakTime } =
    useSelector(settingsSelectors);
  const currentTask = useSelector((state) =>
    state.tasks.tasks.find((task) => task.id === state.tasks.currentTaskId)
  );

  const isRunning = useSelector((state) => state.pomodoro.isRunning);
  const timeLeft = useSelector((state) => state.pomodoro.timeLeft);
  const circumference = 2 * Math.PI * 180;
  const strokeDashoffset = circumference * (1 - progress / 100);

  const totalTime = useMemo(() => {
    return {
      focusTime: focusTime * 60,
      shortBreakTime: shortBreakTime * 60,
      longBreakTime: longBreakTime * 60,
    }[currentMode];
  }, [focusTime, shortBreakTime, longBreakTime, currentMode]);

  const runPomodoro = () => {
    dispatch(togglePomodoro());
  };
  const resetPomodoro = () => {
    dispatch(stopPomodoro());
    dispatch(updateTimeLeft({ time: totalTime }));
  };
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

  useEffect(() => {
    if (isRunning) {
      completedRef.current = false;
    }
  }, [isRunning]);

  const handlePomodoroComplete = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    dispatch(stopPomodoro());
    const modeTime = getModeTime();
    if (currentMode === "focusTime") {
      dispatch(updateCount());
      dispatch(setStreak());
      const mode = getMode();
      dispatch(updateMode({ mode: mode }));
      dispatch(updateTimeLeft({ time: modeTime }));
    } else {
      dispatch(updateMode({ mode: "focusTime" }));
      dispatch(updateTimeLeft({ time: modeTime }));
    }
    // ! note: enable user add aut-start time & add countdown before autostart
    if (autoStartNext) {
      setTimeout(() => dispatch(togglePomodoro()), 3000);
    }
  }, [dispatch, currentMode, autoStartNext, pomodoroCount]);

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
  const times = useMemo(
    () => ({
      focusTime: focusTime * 60,
      shortBreakTime: shortBreakTime * 60,
      longBreakTime: longBreakTime * 60,
    }),
    [focusTime, shortBreakTime, longBreakTime]
  );
  useEffect(() => {
    dispatch(updateTimeLeft({ time: times[currentMode] }));
  }, [dispatch, times, currentMode]);

  useEffect(() => {
    if (!totalTime) return;
    const progressT = ((totalTime - timeLeft) / totalTime) * 100;
    dispatch(updateProgress({ time: progressT }));
  }, [dispatch, totalTime, timeLeft]);
  return (
    <div className="timer-container">
      <div className="timer-circle">
        <svg className="progress-ring" width="400" height="400">
          <circle
            className="progress-ring-background"
            strokeWidth="20"
            fill="transparent"
            r="180"
            cx="190"
            cy="190"
          />
          <defs>
            <linearGradient
              id="progressGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%">
              <stop offset="0%" stopColor="#4740a1" />
              <stop offset="100%" stopColor="#b59dee" />
            </linearGradient>
          </defs>
          <circle
            className="progress-ring-progress"
            stroke="url(#progressGradient)"
            strokeWidth="20"
            fill="transparent"
            r="180"
            cx="190"
            cy="190"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: strokeDashoffset,
            }}
          />
        </svg>

        <div className="timer-content">
          <p className="mode-label">
            {currentMode === "shortBreakTime"
              ? "Short Break"
              : currentMode === "longBreakTime"
              ? "Long Break"
              : "Focus"}
          </p>
          <time className="timer-display">{formatTime(timeLeft)}</time>
        </div>
      </div>
      {currentTask && (
        <p className="mode-label-task">Working on: {currentTask.text}</p>
      )}
      <div className="timer-controls">
        <button
          className="control-button primary"
          onClick={runPomodoro}
          aria-label={isRunning ? "Pause" : "Start"}>
          {isRunning ? <Pause strokeWidth={2.8} /> : <Play strokeWidth={2.8} />}
        </button>
        <button
          className="control-button secondary"
          onClick={skipPomodoro}
          aria-label="Skip">
          <SkipForward strokeWidth={2.8} />
        </button>
        <button
          className="control-button secondary"
          onClick={resetPomodoro}
          aria-label="Reset">
          <RefreshCcw strokeWidth={2.8} />
        </button>
      </div>
    </div>
  );
};
export default Focus;
