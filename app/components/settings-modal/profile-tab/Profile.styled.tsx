import styled from "styled-components";
import { media } from "../../../styles/breakpoints";

export const AccountContent = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  padding-bottom: 10rem;
  @media ${media.md} {
    padding-bottom: 2rem;
  }
`;

export const EditButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.highlight};
  cursor: pointer;
  font-weight: 500;
`;

export const TabSwitcher = styled.div`
  display: flex;
`;

export const TabButton = styled.button`
  color: ${({ theme }) => theme.text};
  font-weight: 500;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    color: ${({ theme }) => theme.highlight};
  }
  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.highlight};
  }
`;

export const ProfileField = styled.div`
  display: flex;
  gap: 0.5rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
  margin-bottom: 0.8rem;

  strong {
    font-weight: 600;
  }

  @media ${media.sm} {
    font-size: 0.95rem;
  }
`;

export const AddTaskButton = styled.button`
  color: ${({ theme }) => theme.buttonText};
  border: none;
  padding: 14px 8px;
  width: 8rem;
  height: auto;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--border-radius);
  box-shadow: ${({ theme }) => theme.boxShadowOuter};

  @media (hover: hover) and (pointer: fine) {
    &:hover:not(:disabled) {
      transform: var(--hover-transform);
    }
  }
  &:disabled {
    color: ${({ theme }) => theme.buttonTextDisabled};
    cursor: not-allowed;
    opacity: 0.5;
  }
  &:active:not(:disabled) {
    box-shadow: ${({ theme }) => theme.boxShadowInsetSoft};
  }
  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.highlight};
  }
`;

export const TaskInput = styled.input`
  padding: 15px 10px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
  transition: var(--transition);
  border-radius: var(--border-radius);
  background-color: ${({ theme }) => theme.inputInner};
  box-shadow: ${({ theme }) => theme.boxShadowInputDisabled};
  &:focus {
    outline: none;
    box-shadow: ${({ theme }) => theme.boxShadowInput};
  }
`;
