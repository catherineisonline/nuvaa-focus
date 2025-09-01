import styled from "styled-components";
import { media } from "../../styles/breakpoints";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--shadow-light);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
`;
export const Modal = styled.div<{ $bgImage?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 90%;
  max-width: 45rem;
  max-height: 90vh;
  min-height: 70vh;
  border-radius: 30px;
  border-radius: 1rem;
  padding: 1.5rem;
  overflow: hidden;
  background: ${({ theme }) => theme.backgroundGradient};
  box-shadow: ${({ $bgImage, theme }) => ($bgImage ? undefined : theme.boxShadowOuter)};
  @media ${media.md} {
    max-width: 100%;
    max-height: 100%;
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
`;
export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--shadow-light);
`;

export const ModalTitle = styled.h2`
  margin: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.text};
  font-size: 2rem;
  font-weight: 500;

  span {
    font-size: 1rem;

    font-weight: 400;
    font-family: var(--font-outfit);
  }
`;

export const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 8px;
  cursor: pointer;
  border-radius: 8px;
  transition: var(--transition);
  color: ${({ theme }) => theme.text};

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background-color: var(--color-glass);
    }
  }
`;

export const ModalBody = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  min-height: 60vh;
  max-height: 80vh;
  gap: 2rem;
  @media ${media.md} {
    flex-direction: column;
    max-height: 85vh;
  }
`;

export const SettingsTabs = styled.section`
  position: relative;
  display: flex;
  border-right: 1px solid var(--shadow-medium);
  padding: 10px;
  flex-direction: column;
  gap: 1rem;
  min-width: auto;
  margin-bottom: 10rem;
  border-radius: var(--border-radius);
  background-color: ${({ theme }) => theme.backgroundSecondary};
  box-shadow: ${({ theme }) => theme.boxShadowInsetSoft};
  @media ${media.md} {
    min-height: 5rem;
    flex-direction: row;
    gap: 0.6rem;
    margin-bottom: 1.5rem;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const TabButton = styled.button<{ $active?: boolean }>`
  border: none;
  cursor: pointer;
  transition: var(--transition);
  border-radius: var(--border-radius);
  color: ${({ $active, theme }) => ($active ? theme.highlight : theme.text)};
  background-color: ${({ $active, theme }) => ($active ? theme.background : "transparent")};
  font-family: var(--font-outfit);
  font-size: 1.1rem;
  font-weight: 800;
  padding: 1rem;
  white-space: nowrap;
  min-width: 5rem;
  text-align: center;
  box-shadow: ${({ $active, theme }) => ($active ? theme.boxShadowOuterStrong : undefined)};

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      color: ${({ theme }) => theme.highlight};
    }
  }
  @media ${media.md} {
    font-size: 1rem;
    min-width: auto;
    flex-shrink: 0;
    white-space: nowrap;
  }
`;
