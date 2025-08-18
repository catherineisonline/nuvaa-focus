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
