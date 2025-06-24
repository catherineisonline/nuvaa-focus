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
            strokeWidth="20"
            fill="transparent"
            r="180"
            cx="190"
            cy="190"
          />
          <defs>
            <linearGradient
              id="progressGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%">
              <stop offset="0%" stopColor="#4740a1" />
              <stop offset="100%" stopColor="#b59dee" />
            </linearGradient>
          </defs>
          <circle
            className="progress-ring-progress"
            stroke="url(#progressGradient)"
            strokeWidth="20"
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
          {isRunning ? <Pause strokeWidth={2.8} /> : <Play strokeWidth={2.8} />}
        </button>
        <button
          className="control-button secondary"
          onClick={skipPomodoro}
          aria-label="Skip">
          <SkipForward strokeWidth={2.8} />
        </button>
        <button
          className="control-button secondary"
          onClick={resetPomodoro}
          aria-label="Reset">
          <RefreshCcw strokeWidth={2.8} />
        </button>
      </div>
    </div>
  );
};
export default Focus;
