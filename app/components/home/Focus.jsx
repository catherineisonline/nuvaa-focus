import { Pause, Play, SkipForward, RefreshCcw } from "lucide-react";

const Focus = ({
  currentMode,
  formatTime,
  timeLeft,
  circumference,
  strokeDashoffset,
  togglePomodoro,
  isRunning,
  skipPomodoro,
  resetPomodoro,
}) => {
  return (
    <div className="timer-container">
      <div className="timer-circle">
        <svg className="progress-ring" width="400" height="400">
          <circle
            className="progress-ring-background"
            strokeWidth="8"
            fill="transparent"
            r="180"
            cx="190"
            cy="190"
          />

          <circle
            className="progress-ring-progress"
            strokeWidth="8"
            fill="transparent"
            r="180"
            cx="190"
            cy="190"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: strokeDashoffset,
            }}
          />
        </svg>

        <div className="timer-content">
          <p className="mode-label">
            {currentMode === "shortBreakTime"
              ? "Short Break"
              : currentMode === "longBreakTime"
              ? "Long Break"
              : "Focus"}
          </p>
          <time className="timer-display">{formatTime(timeLeft)}</time>
        </div>
      </div>
      <div className="timer-controls">
        <button
          className="control-button primary"
          onClick={togglePomodoro}
          aria-label={isRunning ? "Pause" : "Start"}>
          <span>{isRunning ? "Pause" : "Start"}</span>
          {isRunning ? <Pause /> : <Play />}
        </button>
        <button
          className="control-button secondary"
          onClick={skipPomodoro}
          aria-label="Skip">
          <span>Skip</span>
          <SkipForward />
        </button>
        <button
          className="control-button secondary"
          onClick={resetPomodoro}
          aria-label="Reset">
          <span>Reset</span>
          <RefreshCcw />
        </button>
      </div>
    </div>
  );
};
export default Focus;
