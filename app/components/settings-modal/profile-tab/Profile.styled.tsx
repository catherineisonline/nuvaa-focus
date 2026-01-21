import styled from "styled-components";
import { media } from "../../../styles/breakpoints";

export const ModalBody = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  padding-bottom: 10rem;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
  @media ${media.md} {
    padding-bottom: 2rem;
  }
`;

export const ModalHeading = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const EditProfileActions = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

export const SecondaryButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.highlight};
  cursor: pointer;
  font-weight: 500;
  width: max-content;
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      color: ${({ theme }) => theme.text};
    }
  }
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

export const PrimaryButton = styled.button`
  color: ${({ theme }) => theme.buttonText};
  border: none;
  padding: 14px 8px;
  width: 8rem;
  height: auto;
  margin-top: 1rem;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--border-radius);
  background-color: ${({ theme }) => theme.background};
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
export const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
export const AuthInputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
export const AuthInput = styled.input`
  flex: 1;
  padding: 15px 10px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  transition: var(--transition);
  border-radius: var(--border-radius);
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.inputInner};
  box-shadow: ${({ theme }) => theme.boxShadowInputDisabled};
  &:focus {
    outline: none;
    box-shadow: ${({ theme }) => theme.boxShadowInput};
  }
`;

export const AuthLabel = styled.label`
  display: flex;
  flex-direction: column;
  font-weight: 400;
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  font-family: var(--font-outfit);
`;
export const AuthError = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.highlight};
  font-size: 0.9rem;
  font-family: var(--font-outfit);
`;

export const ProfileActions = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const ProfileActionsGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
`;

export const ConfirmationModal = styled.section`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  flex-direction: column;
  gap: 2rem;
  background-color: var(--shadow-light);
  z-index: 1000;
  backdrop-filter: blur(5px);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  p {
    text-align: center;
    text-transform: uppercase;
  }
`;
export const ModalActions = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
`;
