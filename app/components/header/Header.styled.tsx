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
`;

export const Title = styled.h1`
  display: flex;
  flex-direction: column;
  line-height: 1.7rem;
  font-size: 2rem;
  font-family: var(--font-lexend);
  font-weight: 800;
  color: ${({ theme }) => theme.text};

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
export const StreakSpan = styled.span`
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

export const IconButton = styled.button`
  border: none;
  padding: 1rem;
  border-radius: var(--border-radius);
  cursor: pointer;
  backdrop-filter: blur(10px);
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.background};
  box-shadow: ${({ theme }) => theme.boxShadowOuter};
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-medium);
  }

  &:focus {
    background-color: ${({ theme }) => theme.buttonBackgroundActive};
    box-shadow: ${({ theme }) => theme.boxShadowInsetSoft};
  }
`;
export const HamburgerIcon = styled(IconButton)`
  display: none;
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 9999;
  @media ${media.md} {
    display: block;
  }
`;
