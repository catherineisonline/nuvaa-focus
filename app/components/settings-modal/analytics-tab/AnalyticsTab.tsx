import { useSelector } from "react-redux";
import {
  AnalyticsCard,
  AnalyticsContent,
  AnalyticsGrid,
  AnalyticsGroup,
  AnalyticsValue,
  DayProgress,
  DayStats,
  FocusTime,
  PomodoroCount,
  SectionHeading,
  WeeklyProgress,
} from "./Analytics.styled";
import { RootState } from "../../../redux/store";

export const AnalyticsTab = () => {
  const todayPomodoros = useSelector(
    (state: RootState) => state.analytics.todayPomodoros
  );
  const todayFocusTime = useSelector(
    (state: RootState) => state.analytics.todayFocusTime
  );
  const weeklyProgress = useSelector(
    (state: RootState) => state.analytics.weeklyProgress
  );
  return (
    <AnalyticsContent>
      <AnalyticsGroup>
        <SectionHeading>Today&apos;s Progress</SectionHeading>
        <AnalyticsGrid>
          <AnalyticsCard>
            <h4>Pomodoros Completed</h4>
            <AnalyticsValue>{todayPomodoros}</AnalyticsValue>
          </AnalyticsCard>
          <AnalyticsCard>
            <h4>Focus Time</h4>
            <AnalyticsValue>{todayFocusTime} min</AnalyticsValue>
          </AnalyticsCard>
        </AnalyticsGrid>
      </AnalyticsGroup>
      <AnalyticsGroup>
        <SectionHeading>Weekly Progress</SectionHeading>
        <WeeklyProgress>
          {weeklyProgress.map((day, index) => (
            <DayProgress key={index}>
              <h4>{day.day}</h4>
              <DayStats>
                <PomodoroCount>{day.pomodoros}</PomodoroCount>
                <FocusTime>{day.focusTime}m</FocusTime>
              </DayStats>
            </DayProgress>
          ))}
        </WeeklyProgress>
      </AnalyticsGroup>
    </AnalyticsContent>
  );
};
