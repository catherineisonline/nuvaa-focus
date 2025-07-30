import { settingsSelectors } from "../../redux/selectors/settingsSelectors";
import { setupDateTime } from "../../redux/slices/clockSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  ModeLabel,
  TimeNow,
  TimerContainer,
  TimerContentCircle,
  TimerDisplay,
} from "./Page.styled";
import { useBackgroundStatus } from "../../hooks/useBackgroundStatus";

const Clock = () => {
  const dispatch = useDispatch();
  const dateTime = useSelector((state: RootState) => state.clock.dateTime);

  const isBackgroundActive = useBackgroundStatus();
  const { is24Hour } = useSelector(settingsSelectors);
  useEffect(() => {
    const formatTime = () => {
      return new Date().toLocaleTimeString("en-US", {
        hour12: !is24Hour,
        hour: is24Hour ? "2-digit" : "numeric",
        minute: "2-digit",
        second: "2-digit",
      });
    };
    dispatch(setupDateTime({ time: formatTime() }));
    const interval = setInterval(() => {
      dispatch(setupDateTime({ time: formatTime() }));
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch, is24Hour]);
  if (!dateTime) return null;

  return (
    <TimerContainer>
      <TimerContentCircle>
        <ModeLabel $bgImage={isBackgroundActive}>Current Time</ModeLabel>
        <TimeNow $bgImage={isBackgroundActive}>{dateTime}</TimeNow>
      </TimerContentCircle>
    </TimerContainer>
  );
};
export default Clock;
