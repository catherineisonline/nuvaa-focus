import styled from "styled-components";
import { media } from "../../../styles/breakpoints";

export const QuoteSection = styled.section`
  text-align: center;
  width: 100%;
  max-width: 38rem;
  margin: 0 auto;
  display: flex;
  justify-content: center;

  div {
    position: relative;
  }
  @media ${media.md} {
    max-width: 95vw;
  }
`;

export const QuoteDisplayText = styled.p<{ $bgImage?: boolean }>`
  font-size: 1.5rem;
  font-weight: 500;
  padding: 10px 6px;
  color: ${({ $bgImage, theme }) => ($bgImage ? theme.background : theme.text)};
  line-height: 1.3;
  cursor: pointer;
  transition: var(--transition);
  overflow-wrap: break-word;
  white-space: normal;
  max-width: 100%;
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      color: ${({ theme }) => theme.highlight};
      transform: var(--hover-transform);
    }
  }
`;
export const QuoteDisplayInput = styled(QuoteDisplayText)`
  border: none;
  background-color: transparent;
  width: 100%;

  &:focus,
  &:active {
    outline: none;
    color: ${({ theme }) => theme.highlight};
    border-bottom: 2px solid ${({ theme }) => theme.highlight};
    cursor: auto;
  }
`;
