import styled from "styled-components";
import { media } from "../../../styles/breakpoints";

export const SettingsContent = styled.form`
  flex: 1;
  max-height: 95vh;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  overflow-y: scroll;
  padding-bottom: 2rem;

  @media ${media.md} {
    max-height: 95vh;
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
  flex-direction: row;
  gap: 10px;
  align-item: center;

  button {
    background: transparent;
    border: none;
    cursor: pointer;
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
  border: 1px solid ${({ theme }) => theme.text};
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
