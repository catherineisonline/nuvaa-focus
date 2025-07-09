import { settingsSelectors } from "@/app/redux/selectors/settingsSelectors";
import { setupDateTime } from "@/app/redux/slices/clockSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Clock = () => {
  const dispatch = useDispatch();
  const dateTime = useSelector((state) => state.clock.dateTime);
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
    <div className="timer-container">
      <div className="timer-content">
        <p className="mode-label">Current Time</p>
        <time className="timer-display">{dateTime}</time>
      </div>
    </div>
  );
};
export default Clock;
