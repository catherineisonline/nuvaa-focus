"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { toggleStopwatch } from "../../redux/slices/stopwatchSlice";
import { setCurrentTab } from "../../redux/slices/appSlice";
import { togglePomodoro } from "../../redux/slices/pomodoroSlice";
import { ModeTabs, ModeTabButton } from "./Page.styled";
import { useBackgroundStatus } from "../../hooks/useBackgroundStatus";
import { pomodoroSelectors } from "../../redux/selectors/pomodoroSelectors";
import { stopwatchSelectors } from "../../redux/selectors/stopwatchSelectors";

export const ModeTab = () => {
  const dispatch = useDispatch();
  const isBackgroundActive = useBackgroundStatus();
  const { isRunning } = useSelector(pomodoroSelectors);
  const { isStopwatchRunning } = useSelector(stopwatchSelectors);
  const currentTab = useSelector((state: RootState) => state.app.currentTab);

  const updateTab = (tab: string) => {
    if (currentTab === "focus" && isRunning) {
      dispatch(togglePomodoro());
    } else if (currentTab === "stopwatch" && isStopwatchRunning) {
      dispatch(toggleStopwatch());
    }
    dispatch(setCurrentTab(tab));
  };
  return (
    <ModeTabs $bgActive={isBackgroundActive}>
      <ModeTabButton $active={currentTab === "focus"} onClick={() => updateTab("focus")}>
        Focus
      </ModeTabButton>
      <ModeTabButton $active={currentTab === "stopwatch"} onClick={() => updateTab("stopwatch")}>
        Stopwatch
      </ModeTabButton>
      <ModeTabButton $active={currentTab === "clock"} onClick={() => updateTab("clock")}>
        Clock
      </ModeTabButton>
    </ModeTabs>
  );
};
