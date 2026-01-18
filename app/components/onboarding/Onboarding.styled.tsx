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
  max-height: 60vh;
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

export const ModalContent = styled.section`
  padding: 1rem;
  text-align: center;
  min-height: 15rem;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ModalSteps = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
  font-weight: 500;
`;

export const ModalStepsContent = styled.div`
  display: flex;
  flex-direction: column;
  align-item: center;
  justify-content: center;
  gap: 10px;

  h3 {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.text};
    font-weight: 500;
  }
  p {
    color: ${({ theme }) => theme.text};
    opacity: 0.8;
    max-width: 20rem;
  }
`;

export const ProgressDots = styled.ul`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  list-style: none;
`;

export const ProgressDot = styled.li<{ $active: boolean; $complete: boolean }>`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  transition: var(--transition);
  background: ${({ $active, $complete, theme }) =>
    $active ? theme.highlight : $complete ? theme.text : theme.buttonTextDisabled};
  transform: ${({ $active }) => ($active ? "scale(1.2)" : "scale(1)")};
`;

export const ModalNavigation = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: ${({ theme }) => theme.background};
  gap: 10px;
`;

const NavigationBtn = styled.button`
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: var(--transition);
  font-family: var(--font-outfit);
  font-size: 1.1rem;
  font-weight: 800;
  padding: 1rem;
  flex: 1;
  justify-content: center;
  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  @media ${media.md} {
    font-size: 1rem;
    min-width: auto;
    flex-shrink: 0;
    white-space: nowrap;
  }
`;

export const PrimaryNavigationBtn = styled(NavigationBtn)`
  background-color: transparent;
  @media (hover: hover) and (pointer: fine) {
    &:hover:not(:disabled) {
      transform: var(--hover-transform);
      color: ${({ theme }) => theme.highlight};
    }
  }
`;
export const SecondaryNavigationBtn = styled(NavigationBtn)`
  background-color: ${({ theme }) => theme.buttonBackgroundActive};
  color: var(--color-text);
  @media (hover: hover) and (pointer: fine) {
    &:hover:not(:disabled) {
      transform: var(--hover-transform);
    }
  }
`;
