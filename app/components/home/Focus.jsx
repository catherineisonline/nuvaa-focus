import { pomodoroSelectors } from "@/app/redux/selectors/pomodoroSelectors";
import { stopPomodoro, togglePomodoro } from "@/app/redux/slices/pomodoroSlice";
import { Pause, Play, SkipForward, RefreshCcw } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

const Focus = ({ formatTime, skipPomodoro, totalTime, currentTask }) => {
  const dispatch = useDispatch();

  const { progress, currentMode } = useSelector(pomodoroSelectors);
  const isRunning = useSelector((state) => state.pomodoro.isRunning);
  const timeLeft = useSelector((state) => state.pomodoro.timeLeft);
  const circumference = 2 * Math.PI * 180;
  const strokeDashoffset = circumference * (1 - progress / 100);

  const runPomodoro = () => {
    dispatch(togglePomodoro());
  };
  const resetPomodoro = () => {
    dispatch(stopPomodoro());
    dispatch(updateTimeLeft({ time: totalTime }));
  };
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
      {currentTask && (
        <p className="mode-label-task">Working on: {currentTask.text}</p>
      )}
      <div className="timer-controls">
        <button
          className="control-button primary"
          onClick={runPomodoro}
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
