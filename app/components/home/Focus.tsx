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
  updateTimeLeft,
} from "../../redux/slices/pomodoroSlice";
import { Pause, Play, SkipForward, RefreshCcw } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  ControlButton,
  ModeLabel,
  ModeLabelTask,
  TimerContainer,
  TimerContentCircle,
  TimerControls,
  TimerDisplay,
} from "./Page.styled";
import { useBackgroundStatus } from "../../hooks/useBackgroundStatus";

const Focus = ({ formatTime }) => {
  const dispatch = useDispatch();
  const completedRef = useRef(false);
  const intervalRef = useRef(null);
  const { getMode, getModeTime } = usePomodoroMode();

  const { currentMode } = useSelector(pomodoroSelectors);
  const { autoStartNext, focusTime, shortBreakTime, longBreakTime } =
    useSelector(settingsSelectors);
  const currentTask = useSelector((state: RootState) =>
    state.tasks.tasks.find((task) => task.id === state.tasks.currentTaskId)
  );

  const isRunning = useSelector((state: RootState) => state.pomodoro.isRunning);
  const timeLeft = useSelector((state: RootState) => state.pomodoro.timeLeft);

  const isBackgroundActive = useBackgroundStatus();

  const totalTime = useMemo(() => {
    return {
      focusTime: focusTime,
      shortBreakTime: shortBreakTime,
      longBreakTime: longBreakTime,
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
    if (currentMode === "focusTime") {
      const mode = getMode();
      const modeTime = getModeTime();
      dispatch(updateCount());
      dispatch(updateMode({ mode: mode }));
      dispatch(updateTimeLeft({ time: modeTime }));
    } else {
      dispatch(updateMode({ mode: "focusTime" }));
      dispatch(updateTimeLeft({ time: focusTime }));
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

    if (currentMode === "focusTime") {
      dispatch(updateCount());
      dispatch(setStreak());
      const mode = getMode();
      const modeTime = getModeTime();
      dispatch(updateMode({ mode: mode }));
      dispatch(updateTimeLeft({ time: modeTime }));
    } else {
      dispatch(updateMode({ mode: "focusTime" }));
      dispatch(updateTimeLeft({ time: focusTime }));
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

  const times = useMemo(
    () => ({
      focusTime: focusTime,
      shortBreakTime: shortBreakTime,
      longBreakTime: longBreakTime,
    }),
    [focusTime, shortBreakTime, longBreakTime]
  );

  const prevTimesRef = useRef(times);
  useEffect(() => {
    const previous = prevTimesRef.current[currentMode];
    const current = times[currentMode];

    if (previous !== current && timeLeft > 0) {
      dispatch(updateTimeLeft({ time: current }));
    }

    prevTimesRef.current = times;
  }, [dispatch, times, currentMode, timeLeft]);

  return (
    <TimerContainer>
      <TimerContentCircle>
        <ModeLabel $bgImage={isBackgroundActive}>
          {currentMode === "shortBreakTime"
            ? "Short Break"
            : currentMode === "longBreakTime"
            ? "Long Break"
            : "Focus"}
        </ModeLabel>
        <TimerDisplay $bgImage={isBackgroundActive}>
          {formatTime(timeLeft)}
        </TimerDisplay>
      </TimerContentCircle>
      {currentTask && (
        <ModeLabelTask $bgImage={isBackgroundActive}>
          I am working on: {currentTask.text}
        </ModeLabelTask>
      )}
      <TimerControls>
        <ControlButton
          $active={isRunning}
          $bgImage={isBackgroundActive}
          onClick={runPomodoro}
          aria-label={isRunning ? "Pause" : "Start"}>
          {isRunning ? <Pause strokeWidth={2.8} /> : <Play strokeWidth={2.8} />}
        </ControlButton>
        <ControlButton
          $bgImage={isBackgroundActive}
          onClick={skipPomodoro}
          aria-label="Skip">
          <SkipForward strokeWidth={2.8} />
        </ControlButton>
        <ControlButton
          $bgImage={isBackgroundActive}
          onClick={resetPomodoro}
          aria-label="Reset">
          <RefreshCcw strokeWidth={2.8} />
        </ControlButton>
      </TimerControls>
    </TimerContainer>
  );
};
export default Focus;
