"use client";
import styled from "styled-components";
import { media } from "./styles/breakpoints";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
`;

export const MainWrapper = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  gap: 3rem;

  @media ${media.md} {
    gap: 1rem;
  }
`;

export const ErrorContent = styled.section<{ $bgImage: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  transform: translateY(50%);
  width: 100%;
  max-width: 65vw;
  color: ${({ $bgImage, theme }) => ($bgImage ? theme.background : theme.text)};
  background-color: ${({ $bgImage }) => ($bgImage ? "var(--background-glass)" : "transparent")};
  backdrop-filter: ${({ $bgImage }) => ($bgImage ? "blur(2px)" : undefined)};
  text-align: center;
  h2 {
    font-size: 3rem;
  }
  @media ${media.md} {
    max-width: 90vw;
  }
`;
export const ErrorContentList = styled.ul`
  list-style: none;
  text-align: center;
`;

export const GoBack = styled.a`
  display: flex;
  flex-direction: row;
  text-decoration: underline;
  font-weight: 400;
  border-radius: var(--border-radius);
  color: ${({ theme }) => theme.background};
  background-color: ${({ theme }) => theme.highlight};
  padding: 12px 20px;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      transform: var(--hover-transform);
    }
  }
`;
