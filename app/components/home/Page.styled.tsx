"use client";
import styled from "styled-components";

export const TimerContainer = styled.div`
  display: grid;
  grid-template-rows: 25rem 5rem;
  gap: 10px;
  max-width: 1440px;
  align-items: center;
`;

export const ModeTabs = styled.div`
  display: flex;
  border-radius: var(--border-radius);
  padding: 10px;
  background-color: ${({ theme }) => theme.background};
  box-shadow: ${({ theme }) => theme.boxShadowInsetSoft};
`;

export const ModeTabButton = styled.button<{ $active?: boolean }>`
  border: none;
  padding: 20px;
  cursor: pointer;
  transition: var(--transition);
  color: ${({ theme }) => theme.text};
  min-width: 6rem;
  font-size: 1.1rem;
  font-weight: 800;
  font-family: var(--font-outfit);
  background-color: ${({ $active, theme }) =>
    $active ? theme.buttonBackgroundActive : "transparent"};
  border-radius: var(--border-radius);
  box-shadow: ${({ $active, theme }) =>
    $active ? theme.boxShadowOuterStrong : undefined};
  &:hover {
    color: ${({ $active }) => ($active ? undefined : "black")};
  }
`;

export const TimerCircle = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.background};
  box-shadow: ${({ theme }) => theme.boxShadowTimer};
`;

export const ProgressRing = styled.svg`
  transform: rotate(-90deg);
  position: relative;
  z-index: 2;
`;

export const ProgressRingBackground = styled.circle`
  stroke-linecap: round;
`;
export const GradientStop = styled.stop`
  stop-color: ${({ theme }) => theme.highlight};
`;
export const ProgressRingProgress = styled.circle`
  stroke-linecap: round;
  transition: all 1.5s ease-in-out;
  z-index: 999;
`;

export const TimerContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;
export const TimerContentCircle = styled(TimerContent)`
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 362px;
  width: 362px;
  background: ${({ theme }) => theme.backgroundGradientTimer};
  box-shadow: ${({ theme }) => theme.boxShadowTimerStrong};
`;
export const ModeLabel = styled.p`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.text};
  font-weight: 800;
  text-transform: uppercase;
`;

export const ModeLabelTask = styled.p`
  font-weight: 400;
  margin: 0;
  text-align: center;
  font-size: 1.2rem;
`;

export const TimerDisplay = styled.time`
  font-size: 5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

export const TimerControls = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
`;

export const ControlButton = styled.button<{ $active?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  border: none;
  cursor: pointer;
  transition: var(--transition);
  min-width: 7rem;
  color: ${({ theme }) => theme.buttonText};
  justify-content: center;
  border-radius: var(--border-radius);
  background-color: ${({ $active, theme }) =>
    $active ? theme.buttonBackgroundActive : theme.background};
  box-shadow: ${({ $active, theme }) =>
    $active ? theme.boxShadowInsetSoft : theme.boxShadowOuter};
  &:hover {
    transform: translateY(-2px);
  }
  &:active {
    background-color: ${({ theme }) => theme.buttonBackgroundActive};
    box-shadow: ${({ theme }) => theme.boxShadowInsetSoft};
  }
`;
export const ControlButtonSecondary = styled(ControlButton)`
  color: ${({ theme }) => theme.text};
  display: flex;
  justify-content: center;
`;

export const StopwatchContent = styled.div`
  text-align: center;
  align-items: center;
`;
