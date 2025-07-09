import {
  stopStopwatch,
  toggleStopwatch,
  tickStopwatchTime,
  updateStopwatchTime,
} from "@/app/redux/slices/stopwatchSlice";
import { Pause, Play, RefreshCcw } from "lucide-react";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
const StopWatch = ({ formatTime }) => {
  const dispatch = useDispatch();
  const timeLeftStopwatch = useSelector(
    (state) => state.stopwatch.timeLeftStopwatch
  );
  const stopwatchIsRunning = useSelector(
    (state) => state.stopwatch.stopwatchIsRunning
  );
  const stopwatchInitialTime = useSelector((state) => state.settings.stopwatch);
  const stopwatchRef = useRef(null);
  useEffect(() => {
    if (stopwatchIsRunning) {
      stopwatchRef.current = setInterval(() => {
        dispatch(tickStopwatchTime());
      }, 1000);
    } else {
      clearInterval(stopwatchRef.current);
    }

    return () => clearInterval(stopwatchRef.current);
  }, [stopwatchIsRunning, timeLeftStopwatch]);

  const resetStopwatch = () => {
    dispatch(stopStopwatch());
    dispatch(updateStopwatchTime({ time: stopwatchInitialTime }));
  };
  const handleStopwatch = () => {
    dispatch(toggleStopwatch());
  };
  return (
    <div className="timer-container">
      <div className="stopwatch-content">
        <p className="mode-label">Stopwatch</p>
        <time className="timer-display">{formatTime(timeLeftStopwatch)}</time>
      </div>

      <div className="timer-controls">
        <button
          className="control-button primary"
          onClick={handleStopwatch}
          aria-label={stopwatchIsRunning ? "Pause" : "Start"}>
          {stopwatchIsRunning ? (
            <Pause strokeWidth={2.8} />
          ) : (
            <Play strokeWidth={2.8} />
          )}
        </button>
        <button
          className="control-button secondary"
          onClick={resetStopwatch}
          aria-label="Reset">
          <RefreshCcw strokeWidth={2.8} />
        </button>
      </div>
    </div>
  );
};
export default StopWatch;
