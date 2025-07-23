"use client";
import styled from "styled-components";

export const HeaderMain = styled.header`
  display: flex;
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
  color: var(--color-text);

  span {
    font-size: 2.3rem;

    span {
      font-size: 2.3rem;
      color: var(--color-highlight);
    }
  }
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const HeaderControls = styled.ul`
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
  color: var(--color-text);
  font-size: 1.5rem;

  svg {
    fill: var(--color-highlight);
    stroke: var(--color-highlight);
  }
`;

export const IconButton = styled.button`
  border: none;
  padding: 1rem;
  border-radius: var(--border-radius);
  cursor: pointer;
  backdrop-filter: blur(10px);
  color: var(--color-text);
  background: none;
  background: #e7e6e6;
  box-shadow: 10px 10px 20px #989797, -10px -10px 22px #eeeded;
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-medium);
  }

  &:focus {
    background: #e9e6e6;
    box-shadow: inset 6px 6px 13px #c8c6c6, inset -6px -6px 13px #faf8f8;
  }
`;
