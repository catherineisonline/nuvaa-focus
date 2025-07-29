import {
  stopStopwatch,
  toggleStopwatch,
  tickStopwatchTime,
  updateStopwatchTime,
} from "../../redux/slices/stopwatchSlice";
import { Pause, Play, RefreshCcw } from "lucide-react";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  ControlButton,
  ControlButtonSecondary,
  ModeLabel,
  StopwatchContent,
  TimerContainer,
  TimerControls,
  TimerDisplay,
} from "./Page.styled";
import { useBackgroundStatus } from "../../hooks/useBackgroundStatus";
const StopWatch = ({ formatTime }) => {
  const dispatch = useDispatch();
  const isBackgroundActive = useBackgroundStatus();
  const timeLeftStopwatch = useSelector(
    (state: RootState) => state.stopwatch.timeLeftStopwatch
  );
  const stopwatchIsRunning = useSelector(
    (state: RootState) => state.stopwatch.stopwatchIsRunning
  );
  const stopwatchInitialTime = useSelector(
    (state: RootState) => state.settings.stopwatch
  );
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
  }, [stopwatchIsRunning, timeLeftStopwatch, dispatch]);

  const resetStopwatch = () => {
    dispatch(stopStopwatch());
    dispatch(updateStopwatchTime({ time: stopwatchInitialTime }));
  };
  const handleStopwatch = () => {
    dispatch(toggleStopwatch());
  };

  return (
    <TimerContainer>
      <StopwatchContent>
        <ModeLabel $bgImage={isBackgroundActive}>Stopwatch</ModeLabel>
        <TimerDisplay $bgImage={isBackgroundActive}>
          {formatTime(timeLeftStopwatch)}
        </TimerDisplay>
      </StopwatchContent>

      <TimerControls>
        <ControlButton
          $active={stopwatchIsRunning}
          $bgImage={isBackgroundActive}
          onClick={handleStopwatch}
          aria-label={stopwatchIsRunning ? "Pause" : "Start"}>
          {stopwatchIsRunning ? (
            <Pause strokeWidth={2.8} />
          ) : (
            <Play strokeWidth={2.8} />
          )}
        </ControlButton>
        <ControlButtonSecondary
          $active={false}
          $bgImage={isBackgroundActive}
          onClick={resetStopwatch}
          aria-label="Reset">
          <RefreshCcw strokeWidth={2.8} />
        </ControlButtonSecondary>
      </TimerControls>
    </TimerContainer>
  );
};
export default StopWatch;
