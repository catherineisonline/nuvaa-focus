import styled from "styled-components";
import { media } from "../styles/breakpoints";

export const About = styled.main`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  width: 100%;
  max-width: 1440px;
  background-color: var(--shadow-light);
  backdrop-filter: blur(5px);
  padding: 2rem;
`;

export const GoBackButton = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  border: none;
  padding: 1rem;
  font-weight: 800;
  gap: 10px;
  border-radius: var(--border-radius);
  cursor: pointer;
  width: max-content;
  color: ${({ theme }) => theme.background};
  background-color: ${({ theme }) => theme.text};
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      transform: var(--hover-transform);
      box-shadow: var(--shadow-medium);
    }
  }

  &:active {
    background-color: ${({ theme }) => theme.highlight};
  }
`;
export const AboutSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 90vw;
  margin: 0 auto;
`;
export const AboutSectionHeading = styled.h2<{ $bgImage: boolean }>`
  font-size: 2rem;
  font-weight: 500;
  text-align: center;
  color: ${({ theme, $bgImage }) => ($bgImage ? theme.background : theme.text)};
  @media ${media.md} {
    font-size: 1.5rem;
  }
`;

export const AboutSectionParagraph = styled.p<{ $bgImage: boolean }>`
  font-size: 1.2rem;
  font-weight: 400;
  color: ${({ theme, $bgImage }) => ($bgImage ? theme.background : theme.text)};
  text-align: center;
  max-width: 70vw;
  margin: 0 auto;
  @media ${media.md} {
    font-size: 1rem;
  }
`;

export const AboutSteps = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  gap: 2rem;
  color: ${({ theme }) => theme.background};
  @media ${media.md} {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

export const AboutStep = styled.li`
  background-color: ${({ theme }) => theme.text};
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 1rem;
  text-align: center;
  transition: var(--transition);
  &:hover {
    transform: translateY(-4px);
  }
`;

export const AboutStepHeading = styled.h3`
  font-size: 1.5rem;
  font-weight: 500;
  color: ${({ theme }) => theme.background};
  margin-bottom: 16px;
`;

export const AboutStepParagraph = styled.p`
  font-size: 1rem;
  font-weight: 400;
  color: ${({ theme }) => theme.background};
`;
