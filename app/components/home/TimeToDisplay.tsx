import { useDispatch, useSelector } from "react-redux";
import { useBackgroundStatus } from "../../hooks/useBackgroundStatus";
import { TimerDisplay } from "./Page.styled";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { pomodoroSelectors } from "../../redux/selectors/pomodoroSelectors";
import { settingsSelectors } from "../../redux/selectors/settingsSelectors";
import {
  stopPomodoro,
  timeTick,
  togglePomodoro,
  updateCount,
  updateMode,
  updateTimeLeft,
} from "../../redux/slices/pomodoroSlice";
import { setStreak } from "../../redux/slices/appSlice";
import { usePomodoroMode } from "../../hooks/usePomodoroMode";
import { stopwatchSelectors } from "../../redux/selectors/stopwatchSelectors";

export const TimeToDisplay = ({ timeType }: { timeType: string }) => {
  const dispatch = useDispatch();
  const completedRef = useRef(false);
  const intervalRef = useRef(null);
  const { currentMode } = useSelector(pomodoroSelectors);
  const { autoStartNext, focusTime, shortBreakTime, longBreakTime } = useSelector(settingsSelectors);
  const isBackgroundActive = useBackgroundStatus();
  const { timeLeft, isRunning } = useSelector(pomodoroSelectors);
  const { timeLeftStopwatch } = useSelector(stopwatchSelectors);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };
  const { getMode, getModeTime } = usePomodoroMode();
  const times = useMemo(
    () => ({
      focusTime: focusTime,
      shortBreakTime: shortBreakTime,
      longBreakTime: longBreakTime,
    }),
    [focusTime, shortBreakTime, longBreakTime]
  );
  const prevTimesRef = useRef(times);
  let mode = currentMode === "focus" ? "focusTime" : currentMode;
  useEffect(() => {
    const previous = prevTimesRef.current[mode];
    const current = times[mode];

    if (previous !== current && timeLeft > 0) {
      dispatch(updateTimeLeft(current));
    }

    prevTimesRef.current = times;
  }, [dispatch, times, mode, timeLeft]);
  const handlePomodoroComplete = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    dispatch(stopPomodoro());

    if (currentMode === "focus") {
      dispatch(updateCount());
      dispatch(setStreak());
      const mode = getMode();
      const modeTime = getModeTime();
      dispatch(updateMode(mode));
      dispatch(updateTimeLeft(modeTime));
    } else {
      dispatch(updateMode("focus"));
      dispatch(updateTimeLeft(focusTime));
    }
    // ! note: add countdown before autostart
    if (autoStartNext) {
      setTimeout(() => dispatch(togglePomodoro()), 3000);
    }
  }, [dispatch, currentMode, autoStartNext, focusTime, getModeTime, getMode]);
  const timeLeftRef = useRef(timeLeft);

  useEffect(() => {
    timeLeftRef.current = timeLeft;
  }, [timeLeft]);

  useEffect(() => {
    if (!isRunning) return;
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      const next = timeLeftRef.current - 1;
      dispatch(timeTick());
      if (next <= 1) {
        clearInterval(intervalRef.current);
        handlePomodoroComplete();
      }
      timeLeftRef.current = next;
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [dispatch, isRunning, handlePomodoroComplete]);
  useEffect(() => {
    if (isRunning) {
      completedRef.current = false;
    }
  }, [isRunning]);

  return (
    <TimerDisplay $bgImage={isBackgroundActive}>
      {formatTime(timeType === "focus" ? timeLeft : timeLeftStopwatch)}
    </TimerDisplay>
  );
};
