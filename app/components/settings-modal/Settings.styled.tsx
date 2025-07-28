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
export const Modal = styled.div`
  width: 90%;
  max-width: 35rem;
  max-height: 65vh;
  min-height: 60vh;
  border-radius: 30px;
  border-radius: 1rem;
  padding: 1rem;
  overflow: hidden;
  background: ${({ theme }) => theme.backgroundGradient};
  box-shadow: ${({ theme }) => theme.boxShadowOuter};
  @media ${media.md} {
    max-width: 40rem;
  }
`;
export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
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
  font-weight: 600;

  span {
    font-size: 1.2rem;
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

  &:hover {
    background-color: var(--color-glass);
  }
`;

export const ModalBody = styled.div`
  display: flex;
  min-height: 60vh;
  flex-direction: row;
  height: auto;
  max-height: 80vh;
  padding-bottom: 10rem;
  gap: 2rem;

  @media ${media.md} {
    flex-direction: column;
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
    flex-direction: row;
    gap: 0.6rem;
    margin-bottom: auto;
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
  background-color: ${({ $active, theme }) =>
    $active ? theme.background : "transparent"};
  font-family: var(--font-outfit);
  font-size: 1.1rem;
  font-weight: 800;
  padding: 1rem;
  white-space: nowrap;
  min-width: 5rem;
  text-align: center;
  box-shadow: ${({ $active, theme }) =>
    $active ? theme.boxShadowOuterStrong : undefined};

  &:hover {
    color: ${({ theme }) => theme.highlight};
  }
  @media ${media.md} {
    font-size: 1rem;
    min-width: auto;
    flex-shrink: 0;
    white-space: nowrap;
  }
`;
