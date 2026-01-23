import styled from "styled-components";
import { media } from "../../../styles/breakpoints";

export const SettingsContent = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  flex: 1;
  overflow-y: auto;
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

export const SettingGroup = styled.fieldset`
  padding-top: 10px;
  border: none;
`;

export const SectionHeading = styled.legend`
  font-family: var(--font-outfit);
  font-size: 1.1rem;
  font-weight: 800;
`;

export const QuoteGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const RandomQuoteButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  background-color: ${({ theme }) => theme.highlight};
  color: white;
  border: none;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: var(--transition);
  font-size: 1rem;
  font-family: var(--font-outfit);
  width: max-content;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      transform: var(--hover-transform);
    }
  }
`;

export const CurrentQuote = styled.i`
  font-weight: 400;
`;
export const CurrentQuoteWarning = styled(CurrentQuote)`
  color: ${({ theme }) => theme.highlight};
`;

export const QuoteTextArea = styled.textarea`
  flex: 1;
  padding: 15px 10px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  resize: vertical;
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
