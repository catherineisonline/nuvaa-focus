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
  background: #e0e0e0;
  box-shadow: inset 5px 5px 10px #bebebe, inset -5px -5px 10px #ffffff;
`;

export const ModeTabButton = styled.button<{ $active?: boolean }>`
  border: none;
  padding: 20px;
  cursor: pointer;
  transition: var(--transition);
  color: var(--color-text);
  min-width: 6rem;
  font-size: 1.1rem;
  font-weight: 800;
  font-family: var(--font-outfit);
  background: ${(props) => (props.$active ? "#dfdede" : "transparent")};
  border-radius: var(--border-radius);
  box-shadow: ${(props) =>
    props.$active
      ? "18px 18px 22px #989797, -10px -10px 22px #eeeded"
      : undefined};
  &:hover {
    color: ${(props) => (props.$active ? undefined : "black")};
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
  background: #edecec;
  box-shadow: inset 5px 5px 10px #bebebe, inset -5px -5px 10px #ffffff;
`;

export const ProgressRing = styled.svg`
  transform: rotate(-90deg);
  position: relative;
  z-index: 2;
`;

export const ProgressRingBackground = styled.circle`
  stroke-linecap: round;
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
  background: linear-gradient(145deg, #f1efef, #cbc9c9);
  box-shadow: 15px 15px 30px #b6b6b6, -5px -5px 30px #e4e4e4;
`;
export const ModeLabel = styled.p`
  font-size: 1.5rem;
  color: var(--color-text);
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
  color: var(--color-text);
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
  color: var(--color-button-text);
  justify-content: center;
  border-radius: var(--border-radius);
  background: ${(props) => (props.$active ? "#e1dfdf" : "#e7e6e6")};
  box-shadow: ${(props) =>
    props.$active
      ? "inset 6px 6px 13px #c8c6c6, inset -6px -6px 13px #faf8f8"
      : "10px 10px 20px #989797, -10px -10px 22px #eeeded"};
  &:hover {
    transform: translateY(-2px);
  }
  &:active {
    background: #e9e6e6;
    box-shadow: inset 6px 6px 13px #c8c6c6, inset -6px -6px 13px #faf8f8;
  }
`;
export const ControlButtonSecondary = styled(ControlButton)`
  color: var(--color-text);
  display: flex;
  justify-content: center;
`;

export const StopwatchContent = styled.div`
  text-align: center;
  align-items: center;
`;
