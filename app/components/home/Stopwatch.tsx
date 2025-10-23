import {
  stopStopwatch,
  toggleStopwatch,
  tickStopwatchTime,
  updateStopwatchTime,
} from "../../redux/slices/stopwatchSlice";

import Pause from "lucide-react/dist/esm/icons/pause";
import Play from "lucide-react/dist/esm/icons/play";
import RefreshCcw from "lucide-react/dist/esm/icons/refresh-ccw";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { stopwatchSelectors } from "../../redux/selectors/stopwatchSelectors";
const StopWatch = ({ formatTime }) => {
  const dispatch = useDispatch();
  const isBackgroundActive = useBackgroundStatus();
  const { isStopwatchRunning, timeLeftStopwatch, stopwatchTime } = useSelector(stopwatchSelectors);

  const stopwatchRef = useRef(null);
  useEffect(() => {
    if (isStopwatchRunning) {
      stopwatchRef.current = setInterval(() => {
        dispatch(tickStopwatchTime());
      }, 1000);
    } else {
      clearInterval(stopwatchRef.current);
    }

    return () => clearInterval(stopwatchRef.current);
  }, [isStopwatchRunning, timeLeftStopwatch, dispatch]);

  const resetStopwatch = () => {
    dispatch(stopStopwatch());
    dispatch(updateStopwatchTime(stopwatchTime));
  };
  const handleStopwatch = () => {
    dispatch(toggleStopwatch());
  };

  return (
    <TimerContainer>
      <StopwatchContent>
        <ModeLabel $bgImage={isBackgroundActive}>Stopwatch</ModeLabel>

        <TimerDisplay $bgImage={isBackgroundActive}>{formatTime(timeLeftStopwatch)}</TimerDisplay>
      </StopwatchContent>

      <TimerControls>
        <ControlButton
          $active={isStopwatchRunning}
          $bgImage={isBackgroundActive}
          onClick={handleStopwatch}
          aria-label={isStopwatchRunning ? "Pause" : "Start"}>
          {isStopwatchRunning ? <Pause strokeWidth={2.8} /> : <Play strokeWidth={2.8} />}
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
