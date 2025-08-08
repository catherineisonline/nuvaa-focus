import styled from "styled-components";
import { media } from "../../../styles/breakpoints";

export const AnalyticsContent = styled.section`
  flex: 1;
  max-height: 95vh;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  overflow-y: scroll;
  padding-bottom: 2rem;

  @media ${media.md} {
    max-height: 95vh;
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
  background-color: ${({ theme }) => theme.backgroundSecondary};
  padding: 2rem;
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
