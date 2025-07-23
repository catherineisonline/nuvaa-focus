"use client";
import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
`;

export const MainWrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 200px);
  padding: 1rem;
  gap: 3rem;
`;
