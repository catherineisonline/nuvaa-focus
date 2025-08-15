import styled from "styled-components";
import { media } from "../../../styles/breakpoints";

export const SettingsContent = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  flex: 1;
  overflow-y: auto;
  padding-bottom: 10rem;
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
  width: 100%;
  max-width: 18rem;
  max-height: 13rem;
  padding: 12px;
  border: 2px solid ${({ theme }) => theme.text};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.backgroundSecondary}
  font-size: 0.9rem;
  color:  ${({ theme }) => theme.text}

   @media ${media.md} {
    max-width: 30rem;
  }

  &:focus, &:active {
   outline: none;
    border: 2px solid ${({ theme }) => theme.highlight};
    cursor: auto;
  }
`;
