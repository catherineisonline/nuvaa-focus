"use client";
import { usePomodoroMode } from "../../hooks/usePomodoroMode";
import { pomodoroSelectors } from "../../redux/selectors/pomodoroSelectors";
import { settingsSelectors } from "../../redux/selectors/settingsSelectors";

import {
  stopPomodoro,
  togglePomodoro,
  updateCount,
  updateMode,
  updateTimeLeft,
} from "../../redux/slices/pomodoroSlice";
import { Pause, Play, SkipForward, RefreshCcw } from "lucide-react";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  ControlButton,
  ModeLabel,
  ModeLabelTask,
  TimerContainer,
  TimerContentCircle,
  TimerControls,
} from "./Page.styled";
import { useBackgroundStatus } from "../../hooks/useBackgroundStatus";
import { TimeToDisplay } from "./TimeToDisplay";

const Focus = () => {
  const dispatch = useDispatch();
  const { getMode, getModeTime } = usePomodoroMode();

  const { currentMode } = useSelector(pomodoroSelectors);
  const { focusTime, shortBreakTime, longBreakTime } = useSelector(settingsSelectors);
  const currentTask = useSelector((state: RootState) =>
    state.tasks.tasks.find((task) => task.id === state.tasks.currentTaskId)
  );

  const isRunning = useSelector((state: RootState) => state.pomodoro.isRunning);
  let mode = currentMode === "focus" ? "focusTime" : currentMode;
  const isBackgroundActive = useBackgroundStatus();
  console.log(currentMode);
  const totalTime = useMemo(() => {
    return {
      focusTime: focusTime,
      shortBreakTime: shortBreakTime,
      longBreakTime: longBreakTime,
    }[mode];
  }, [focusTime, shortBreakTime, longBreakTime, mode]);

  const runPomodoro = () => {
    dispatch(togglePomodoro());
  };
  const resetPomodoro = () => {
    dispatch(stopPomodoro());
    console.log(totalTime);
    dispatch(updateTimeLeft(totalTime));
  };
  const skipPomodoro = () => {
    dispatch(stopPomodoro());
    if (currentMode === "focus") {
      const mode = getMode();
      const modeTime = getModeTime();
      dispatch(updateCount());
      dispatch(updateMode(mode));
      dispatch(updateTimeLeft(modeTime));
    } else {
      dispatch(updateMode("focus"));
      dispatch(updateTimeLeft(focusTime));
    }
  };

  return (
    <TimerContainer>
      <TimerContentCircle>
        <ModeLabel $bgImage={isBackgroundActive}>
          {currentMode === "shortBreakTime" ? "Short Break" : currentMode === "longBreakTime" ? "Long Break" : "Focus"}
        </ModeLabel>
        <TimeToDisplay timeType="focus" />
      </TimerContentCircle>
      {currentTask && <ModeLabelTask $bgImage={isBackgroundActive}>I am working on: {currentTask.text}</ModeLabelTask>}
      <TimerControls>
        <ControlButton
          $active={isRunning}
          $bgImage={isBackgroundActive}
          onClick={runPomodoro}
          aria-label={isRunning ? "Pause" : "Start"}>
          {isRunning ? <Pause strokeWidth={2.8} /> : <Play strokeWidth={2.8} />}
        </ControlButton>
        <ControlButton $bgImage={isBackgroundActive} onClick={skipPomodoro} aria-label="Skip">
          <SkipForward strokeWidth={2.8} />
        </ControlButton>
        <ControlButton $bgImage={isBackgroundActive} onClick={resetPomodoro} aria-label="Reset">
          <RefreshCcw strokeWidth={2.8} />
        </ControlButton>
      </TimerControls>
    </TimerContainer>
  );
};
export default Focus;
