import styled from "styled-components";
import { media } from "../../../styles/breakpoints";

export const ModalBody = styled.div`
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

export const SectionHeading = styled.h3`
  font-family: var(--font-outfit);
  font-size: 1.1rem;
  font-weight: 800;
`;
export const MusicOptions = styled.div<{ $bgActive: boolean }>`
  display: flex;
  flex-direction: column;
  border-radius: var(--border-radius);
  padding: 10px;
  background-color: ${({ theme }) => theme.backgroundSecondary};
  box-shadow: ${({ theme }) => theme.boxShadowInsetSoft};

  h3 {
    margin: 0 0 20px 0;
    color: ${({ theme }) => theme.text};
    font-size: 1.1rem;
    font-weight: 500;
  }
`;

export const MusicOption = styled.div<{ $active: boolean }>`
  position: relative;
  border: none;
  padding: 20px;
  cursor: pointer;
  transition: var(--transition);
  color: ${({ theme }) => theme.text};
  min-width: 6rem;
  font-size: 1.1rem;
  font-weight: 800;
  font-family: var(--font-outfit);
  background-color: ${({ $active, theme }) => ($active ? theme.buttonBackgroundActive : "transparent")};
  border-radius: var(--border-radius);
  box-shadow: ${({ $active, theme }) => ($active ? theme.boxShadowOuterStrong : undefined)};

  &:hover {
    color: ${({ theme }) => theme.highlight};
  }

  &:has(input[type="radio"]:focus-visible) {
    outline: 3px solid ${({ theme }) => theme.highlight};
  }
`;

export const RadioOption = styled.label`
  cursor: pointer;
  &:has(input:checked) {
    border-color: ${({ theme }) => theme.text};
  }
`;
export const HiddenRadio = styled.input.attrs({ type: "radio" })`
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  pointer-events: none;
  width: 100%;
  height: 100%;
`;
export const OptionContent = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const OptionText = styled.div`
  h4 {
    margin: 0 0 4px 0;
    font-size: 1rem;
    font-weight: 500;
  }

  p {
    margin: 0;
    font-size: 0.9rem;
    opacity: 0.8;
  }
`;

export const CustomUrlSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const UrlInput = styled.input`
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

export const UrlHelp = styled.div`
  background-color: ${({ theme }) => theme.background};
  padding: 0.9rem;
  border-radius: 8px;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text};

  p {
    margin: 0 0 8px 0;
    font-weight: 500;
  }

  ul {
    margin: 0;
    padding-left: 1rem;
  }

  li {
    margin-bottom: 4px;
    font-family: monospace;
  }
`;

export const MusicControls = styled.div`
  padding: 1rem;
  p {
    font-weight: 400;
    font-size: 0.9rem;
  }
  p:last-child {
    margin-bottom: 0;
    opacity: 0.7;
    font-style: italic;
  }
`;

export const MusicPlayer = styled.div`
  background-color: ${({ theme }) => theme.backgroundGradient};
  border-radius: 0.9rem;
  padding: 20px;
  margin-bottom: 2rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 40rem;

  h4 {
    margin: 0 0 1rem 0;
    color: ${({ theme }) => theme.text};
    font-size: 1rem;
    font-weight: 500;
  }
`;
export const SpotifyPlayer = styled(MusicPlayer)`
  position: absolute;
  z-index: 9999;
`;

export const MusicLink = styled.a`
  display: inline-block;
  background-color: ${({ theme }) => theme.buttonBackgroundActive};
  color: ${({ theme }) => theme.buttonText};
  padding: 12px 20px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  &:hover {
    transform: translateY(-1px);
  }
`;
export const SpotifyEmbed = styled.div`
  position: relative;
  padding-bottom: 3rem;
  wdith: 100%;
  height: 30rem;
  overflow: hidden;
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 30rem;
    border: none;
  }
`;
export const YoutubeEmbed = styled(SpotifyEmbed)`
  height: 20rem;
`;
