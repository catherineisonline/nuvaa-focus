"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { toggleStopwatch } from "../../redux/slices/stopwatchSlice";
import { setCurrentTab } from "../../redux/slices/appSlice";
import { togglePomodoro } from "../../redux/slices/pomodoroSlice";

export const ModeTab = () => {
  const dispatch = useDispatch();

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
    <div className="mode-tabs neu-mode-inner">
      <button
        className={`mode-tab ${currentTab === "focusTime" ? "active" : ""}`}
        onClick={() => updateTab("focusTime")}>
        Focus
      </button>
      <button
        className={`mode-tab ${currentTab === "stopwatch" ? "active" : ""}`}
        onClick={() => updateTab("stopwatch")}>
        Stopwatch
      </button>
      <button
        className={`mode-tab ${currentTab === "clock" ? "active" : ""}`}
        onClick={() => updateTab("clock")}>
        Clock
      </button>
    </div>
  );
};
