import { useSelector } from "react-redux";
import { pomodoroSelectors } from "../redux/selectors/pomodoroSelectors";
import { settingsSelectors } from "../redux/selectors/settingsSelectors";

export function usePomodoroMode() {
  const { pomodoroCount } = useSelector(pomodoroSelectors);
  const { shortBreakTime, longBreakTime, focusTime } =
    useSelector(settingsSelectors);
  const getMode = () => {
    return (pomodoroCount + 1) % 4 === 0 ? "longBreakTime" : "shortBreakTime";
  };
  const getModeTime = () => {
    const mode = getMode();
    return mode === "longBreakTime"
      ? longBreakTime
      : mode === "shortBreakTime"
      ? shortBreakTime
      : focusTime;
  };
  return { getMode, getModeTime };
}
