import { Pause, Play, RefreshCcw } from "lucide-react";
const StopWatch = ({
  formatTime,
  timeLeftStopwatch,
  toggleStopwatch,
  stopwatchIsRunning,
  resetStopwatch,
}) => {
  return (
    <div className="timer-container">
      <div className="stopwatch-content">
        <p className="mode-label">Stopwatch</p>
        <time className="timer-display">{formatTime(timeLeftStopwatch)}</time>
      </div>

      <div className="timer-controls">
        <button
          className="control-button primary"
          onClick={toggleStopwatch}
          aria-label={stopwatchIsRunning ? "Pause" : "Start"}>
          <span>{stopwatchIsRunning ? "Pause" : "Start"}</span>
          {stopwatchIsRunning ? <Pause /> : <Play />}
        </button>
        <button
          className="control-button secondary"
          onClick={resetStopwatch}
          aria-label="Reset">
          <span>Reset</span>
          <RefreshCcw />
        </button>
      </div>
    </div>
  );
};
export default StopWatch;
