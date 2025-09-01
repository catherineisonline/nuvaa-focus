"use client";
import styled from "styled-components";
import { media } from "../../styles/breakpoints";

export const TimerContainer = styled.div`
  display: grid;
  grid-template-rows: 15rem 5rem;
  gap: 10px;
  max-width: 1440px;
  min-width: 30rem;
  align-items: center;
  @media ${media.md} {
    grid-template-rows: 12rem 5rem;
    min-width: 20rem;
  }
`;

export const ModeTabs = styled.div<{ $bgActive?: boolean }>`
  display: flex;
  border-radius: var(--border-radius);
  padding: 10px;
  background-color: ${({ theme }) => theme.background};
  box-shadow: ${({ $bgActive, theme }) => ($bgActive ? undefined : theme.boxShadowInsetSoft)};
  @media ${media.md} {
    height: 4rem;
  }
`;

export const ModeTabButton = styled.button<{
  $active?: boolean;
}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: none;
  padding: 20px;
  cursor: pointer;
  transition: var(--transition);
  color: ${({ theme }) => theme.text};
  min-width: 6rem;
  font-size: 1.1rem;
  font-weight: 800;
  font-family: var(--font-outfit);
  background-color: ${({ $active, theme }) => ($active ? theme.buttonBackgroundActive : "transparent")};
  border-radius: var(--border-radius);
  box-shadow: ${({ $active, theme }) => ($active ? theme.boxShadowOuterStrong : undefined)};

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      color: ${({ theme, $active }) => ($active ? undefined : theme.highlight)};
    }
  }
  @media ${media.md} {
    min-width: 5rem;
    max-width: fit-content;
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
  line-height: 5rem;
  text-transform: uppercase;
`;

export const ModeLabelTask = styled.p<{ $bgImage?: boolean }>`
  font-weight: 500;
  margin: 0;
  line-height: 1.3rem;
  text-align: center;
  font-size: 1.5rem;
  font-family: var(--font-outfit);
  overflow-wrap: break-word;
  white-space: normal;
  max-width: 100%;
  color: ${({ $bgImage, theme }) => ($bgImage ? theme.background : theme.text)};
  @media ${media.md} {
    max-width: 95vw;
  }
`;

export const TimerDisplay = styled.time<{ $bgImage?: boolean }>`
  font-size: clamp(6rem, 13vw, 13rem);
  font-weight: 500;
  line-height: 7.5rem;
  color: ${({ $bgImage, theme }) => ($bgImage ? theme.background : theme.text)};
  @media ${media.md} {
    font-size: clamp(6rem, 10vw, 10rem);
    line-height: 2.5rem;
  }
`;
export const TimeNow = styled(TimerDisplay)`
  font-size: clamp(5rem, 15vw, 14rem);
`;
export const TimerControls = styled.div`
  display: flex;
  gap: 1rem;
  padding-top: 1rem;
  align-items: center;
  justify-content: center;
  @media ${media.md} {
    gap: 0.8rem;
  }
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
  max-width: 7rem;
  width: 100%;
  color: ${({ theme }) => theme.buttonText};
  justify-content: center;
  border-radius: var(--border-radius);
  background-color: ${({ $active, theme }) => ($active ? theme.buttonBackgroundActive : theme.background)};
  box-shadow: ${({ $active, $bgImage, theme }) =>
    $bgImage ? undefined : $active ? theme.boxShadowInsetSoft : theme.boxShadowOuter};

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      transform: var(--hover-transform);
    }
  }
  &:active {
    background-color: ${({ theme }) => theme.buttonBackgroundActive};
    box-shadow: ${({ $bgImage, theme }) => ($bgImage ? undefined : theme.boxShadowInsetSoft)};
  }
  @media ${media.md} {
    max-width: 5rem;
    padding: 10px 20px;
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
