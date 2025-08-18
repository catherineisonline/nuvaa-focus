import styled from "styled-components";
import { media } from "../../../styles/breakpoints";

export const AnalyticsContent = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  flex: 1;
  overflow-y: auto;
  padding-bottom: 10rem;
  @media ${media.md} {
    padding-bottom: 2rem;
  }
`;

export const AnalyticsGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const SectionHeading = styled.h3`
  font-family: var(--font-outfit);
  font-size: 1.1rem;
  font-weight: 800;
`;

export const AnalyticsGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
`;

export const AnalyticsCard = styled.article`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.backgroundSecondary};
  padding: 1rem;
  border-radius: var(--border-radius);
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0.1);

  h4 {
    font-size: 1rem;
    color: ${({ theme }) => theme.text};
    opacity: 0.8;
  }
`;

export const AnalyticsValue = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

export const WeeklyProgress = styled.section`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding: 1rem 0;
`;

export const DayProgress = styled.article`
  min-width: 4rem;
  text-align: center;
  background-color: ${({ theme }) => theme.backgroundSecondary};
  padding: 12px 8px;
  border-radius: var(--border-radius);
  border: 1px solid rgba(0, 0, 0, 0.1);

  h4 {
    font-size: 1rem;
    font-weight: 600;
    color: ${({ theme }) => theme.text};
  }
`;

export const DayStats = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const PomodoroCount = styled.p`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

export const FocusTime = styled.p`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
`;

export const TodaysChartWrapper = styled.div`
  .recharts-x-axis text {
    fill: ${({ theme }) => theme.text};
  }

  .recharts-y-axis text {
    fill: ${({ theme }) => theme.text};
  }

  .recharts-scatter-symbol {
    fill: ${({ theme }) => theme.highlight};
  }
`;

export const WeeklyChartWrapper = styled(TodaysChartWrapper)`
  .recharts-x-axis {
    stroke: ${({ theme }) => theme.text};
  }
  .recharts-bar-rectangle {
    fill: ${({ theme }) => theme.highlight};
  }
`;
