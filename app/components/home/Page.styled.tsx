"use client";
import styled from "styled-components";
import { media } from "../../styles/breakpoints";

export const TimerContainer = styled.div`
  display: grid;
  grid-template-rows: 25rem 5rem;
  gap: 10px;
  max-width: 1440px;
  align-items: center;
`;

export const ModeTabs = styled.div<{ $bgActive?: boolean }>`
  display: flex;
  border-radius: var(--border-radius);
  padding: 10px;
  background-color: ${({ theme }) => theme.background};
  box-shadow: ${({ $bgActive, theme }) =>
    $bgActive ? undefined : theme.boxShadowInsetSoft};
`;

export const ModeTabButton = styled.button<{
  $active?: boolean;
}>`
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
`;

export const TimerContentCircle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const ModeLabel = styled.p<{ $bgImage?: boolean }>`
  font-size: 1.5rem;
  color: ${({ $bgImage, theme }) => ($bgImage ? theme.background : theme.text)};
  font-weight: 800;
  text-transform: uppercase;
`;

export const ModeLabelTask = styled.p<{ $bgImage?: boolean }>`
  font-weight: 500;
  margin: 0;
  text-align: center;
  font-size: 1.5rem;
  font-family: var(--font-outfit);
  color: ${({ $bgImage, theme }) => ($bgImage ? theme.background : theme.text)};
`;

export const TimerDisplay = styled.time<{ $bgImage?: boolean }>`
  font-size: 10rem;
  font-weight: 600;
  line-height: 7.5rem;
  color: ${({ $bgImage, theme }) => ($bgImage ? theme.background : theme.text)};

  @media ${media.md} {
    font-size: 8rem;
  }
`;

export const TimerControls = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
`;

export const ControlButton = styled.button<{
  $active?: boolean;
  $bgImage?: boolean;
}>`
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
  box-shadow: ${({ $active, $bgImage, theme }) =>
    $bgImage
      ? undefined
      : $active
      ? theme.boxShadowInsetSoft
      : theme.boxShadowOuter};
  &:hover {
    transform: translateY(-2px);
  }
  &:active {
    background-color: ${({ theme }) => theme.buttonBackgroundActive};
    box-shadow: ${({ $bgImage, theme }) =>
      $bgImage ? undefined : theme.boxShadowInsetSoft};
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
