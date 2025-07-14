import { usePomodoroMode } from "../../hooks/usePomodoroMode";
import { pomodoroSelectors } from "../../redux/selectors/pomodoroSelectors";
import { settingsSelectors } from "../../redux/selectors/settingsSelectors";
import { setStreak } from "../../redux/slices/appSlice";
import {
  stopPomodoro,
  timeTick,
  togglePomodoro,
  updateCount,
  updateMode,
  updateProgress,
  updateTimeLeft,
} from "../../redux/slices/pomodoroSlice";
import { Pause, Play, SkipForward, RefreshCcw } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Focus = ({ formatTime }) => {
  const dispatch = useDispatch();
  const completedRef = useRef(false);
  const intervalRef = useRef(null);
  const { getMode, getModeTime } = usePomodoroMode();

  const { progress, currentMode, pomodoroCount } =
    useSelector(pomodoroSelectors);
  const { autoStartNext, focusTime, shortBreakTime, longBreakTime } =
    useSelector(settingsSelectors);
  const currentTask = useSelector((state: RootState) =>
    state.tasks.tasks.find((task) => task.id === state.tasks.currentTaskId)
  );

  const isRunning = useSelector((state: RootState) => state.pomodoro.isRunning);
  const timeLeft = useSelector((state: RootState) => state.pomodoro.timeLeft);
  const circumference = 2 * Math.PI * 190;
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
    // ! note: add countdown before autostart
    if (autoStartNext) {
      setTimeout(() => dispatch(togglePomodoro()), 3000);
    }
  }, [dispatch, currentMode, autoStartNext, getModeTime, getMode]);

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
      <div className="timer-circle neu-circle">
        <svg className="progress-ring" width="400" height="400">
          <circle
            className="progress-ring-background"
            strokeWidth="20"
            fill="transparent"
            r="190"
            cx="200"
            cy="200"
          />
          <defs>
            <linearGradient
              id="progressGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%">
              <stop offset="0%" stopColor="#b62c0a" />
              <stop offset="100%" stopColor="#b62c0a" />
            </linearGradient>
          </defs>
          <circle
            className="progress-ring-progress"
            stroke="url(#progressGradient)"
            strokeWidth="20"
            fill="transparent"
            r="190"
            cx="200"
            cy="200"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: strokeDashoffset,
            }}
          />
        </svg>

        <div className="timer-content neu-circle-inner">
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
          className={`control-button ${
            isRunning ? " neu-button-active" : "neu-button"
          }`}
          onClick={runPomodoro}
          aria-label={isRunning ? "Pause" : "Start"}>
          {isRunning ? <Pause strokeWidth={2.2} /> : <Play strokeWidth={2.2} />}
        </button>
        <button
          className="control-button neu-button"
          onClick={skipPomodoro}
          aria-label="Skip">
          <SkipForward strokeWidth={2.2} />
        </button>
        <button
          className="control-button neu-button"
          onClick={resetPomodoro}
          aria-label="Reset">
          <RefreshCcw strokeWidth={2.2} />
        </button>
      </div>
    </div>
  );
};
export default Focus;
