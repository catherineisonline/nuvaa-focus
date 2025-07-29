"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { toggleStopwatch } from "../../redux/slices/stopwatchSlice";
import { setCurrentTab } from "../../redux/slices/appSlice";
import { togglePomodoro } from "../../redux/slices/pomodoroSlice";
import { ModeTabs, ModeTabButton } from "./Page.styled";
import { useBackgroundStatus } from "../../hooks/useBackgroundStatus";

export const ModeTab = () => {
  const dispatch = useDispatch();
  const isBackgroundActive = useBackgroundStatus();
  const isRunning = useSelector((state: RootState) => state.pomodoro.isRunning);
  const isRunningStopwatch = useSelector(
    (state: RootState) => state.stopwatch.stopwatchIsRunning
  );
  const currentTab = useSelector((state: RootState) => state.app.currentTab);

  const updateTab = (tab: string) => {
    if (currentTab === "focusTime" && isRunning) {
      dispatch(togglePomodoro());
    } else if (currentTab === "stopwatch" && isRunningStopwatch) {
      dispatch(toggleStopwatch());
    }
    dispatch(setCurrentTab({ tab: tab }));
  };
  return (
    <ModeTabs $bgActive={isBackgroundActive}>
      <ModeTabButton
        $active={currentTab === "focusTime"}
        onClick={() => updateTab("focusTime")}>
        Focus
      </ModeTabButton>
      <ModeTabButton
        $active={currentTab === "stopwatch"}
        onClick={() => updateTab("stopwatch")}>
        Stopwatch
      </ModeTabButton>
      <ModeTabButton
        $active={currentTab === "clock"}
        onClick={() => updateTab("clock")}>
        Clock
      </ModeTabButton>
    </ModeTabs>
  );
};
