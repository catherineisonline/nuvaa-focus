"use client";

import styled from "styled-components";
import { media } from "../../styles/breakpoints";

export const HeaderMain = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  position: relative;
  z-index: 100;
  max-width: 1440px;
  margin: 0 auto;
`;

export const Title = styled.h1<{ $bgImage?: boolean }>`
  display: flex;
  flex-direction: column;
  line-height: 1.7rem;
  font-size: 2rem;
  font-family: var(--font-lexend);
  font-weight: 800;
  color: ${({ $bgImage, theme }) => ($bgImage ? theme.background : theme.text)};

  span {
    font-size: 2.3rem;

    span {
      font-size: 2.3rem;
      color: ${({ theme }) => theme.highlight};
    }
  }
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
export const StreakSpan = styled.span<{ $bgImage?: boolean }>`
  color: ${({ $bgImage, theme }) => ($bgImage ? theme.background : theme.text)};
  @media ${media.md} {
    padding-right: 5rem;
  }
`;
export const HeaderControls = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  gap: 1rem;

  @media ${media.md} {
    display: none;
  }
`;

export const HeaderControlsMobile = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  gap: 1rem;
`;
export const PomodoroCounter = styled.p`
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  font-size: 1.5rem;

  svg {
    fill: ${({ theme }) => theme.highlight};
    stroke: ${({ theme }) => theme.highlight};
  }
`;

export const IconButton = styled.button<{ $bgImage?: boolean }>`
  border: none;
  padding: 1rem;
  border-radius: var(--border-radius);
  cursor: pointer;
  backdrop-filter: blur(10px);
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.background};
  box-shadow: ${({ $bgImage, theme }) =>
    $bgImage ? undefined : theme.boxShadowOuter};
  transition: var(--transition);
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      transform: var(--hover-transform);
      box-shadow: var(--shadow-medium);
    }
  }

  &:active {
    background-color: ${({ theme }) => theme.buttonBackgroundActive};
    box-shadow: ${({ theme }) => theme.boxShadowInsetSoft};
  }
`;
export const HamburgerIcon = styled(IconButton)<{ $bgImage?: boolean }>`
  display: none;
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 9999;
  @media ${media.md} {
    display: block;
  }
`;
