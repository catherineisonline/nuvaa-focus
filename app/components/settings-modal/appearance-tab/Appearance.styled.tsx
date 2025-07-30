import styled from "styled-components";
import { media } from "../../../styles/breakpoints";

export const SettingsContent = styled.form`
  flex: 1;
  max-height: calc(60vh - 100px);
  display: flex;
  flex-direction: column;
  gap: 2rem;
  overflow-y: scroll;
  padding-bottom: 2rem;
  @media ${media.md} {
    max-height: calc(50vh - 100px);
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

export const ThemeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(3rem, 4rem));
  gap: 5px;
`;
export const ThemeOption = styled.button<{
  $active?: boolean;
  $colorBackground: string;
  $colorBorder: string;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  cursor: pointer;
  transition: var(--transition);
  border-radius: var(--border-radius);
  text-align: center;
  font-family: var(--font-lexend);
  border: 1px solid transparent;
  background: ${({ $colorBackground }) => $colorBackground};
  border-color: ${({ $active, $colorBorder, $colorBackground }) =>
    $active ? $colorBorder : $colorBackground};

  &:hover {
    opacity: 0.7;
    transform: translateY(-4px);
  }
`;
export const ThemeLabel = styled.span`
  font-size: 0.7rem;
  font-weight: 500;
  color: var(--color-text);
`;

export const BackgroundGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(6.25rem, 7.5rem));
  gap: 1rem;
`;

export const BackgroundOption = styled.button<{ $isActive: boolean }>`
  background: none;
  border-width: 2px;
  border-style: solid;
  border-color: ${({ $isActive }) =>
    $isActive ? "var(--color-button-bg)" : "transparent"};
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: var(--transition);
  padding: 4px;

  &:hover {
    border-color: var(--color-accent);
  }
  img {
    max-width: 100%;
    width: 100%;
    height: 5rem;
    object-fit: cover;
    border-radius: 4px;
    position: relative;
  }
`;

export const SingleBackground = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const RemoveBackgroundButton = styled.button`
  position: absolute;
  z-index: 9999;
  top: -8px;
  right: -8px;
  background-color: ${({ theme }) => theme.boxShadowTimer};
  border-radius: 50%;
  border-size: 1px;
  border-style: solid;
  border-color: ${({ theme }) => theme.text};
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: var(--transition);

  svg {
    border-color: ${({ theme }) => theme.text};
  }
  &:hover {
    transform: translateY(-2px);
  }
`;

export const RemoveCurrentBackground = styled.button`
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
  max-width: 18rem;
  width: 100%;
  &:hover {
    transform: translateY(-2px);
  }
`;

export const FileUploadSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  max-width: 18rem;
  width: 100%;
  height: 11rem;
  border-width: 2px;
  border-style: dashed;
  border-color: ${({ theme }) => theme.buttonText};
  color: ${({ theme }) => theme.text};
  text-align: center;
  cursor: pointer;
  padding: 1rem;
  border-radius: 8px;
  position: relative;

  label {
    font-size: 1rem;
    font-family: var(--font-outfit);

    span {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 10px;
    }
    small {
      color: ${({ theme }) => theme.buttonText};
      font-weight: 400;
      font-size: 1rem;
    }
  }
`;

export const FileUploadInput = styled.input`
  opacity: 0;
  position: absolute;
  inset: 0;
  cursor: pointer;
  width: 100%;
  height: 100%;
  background-color: transparent;
`;

export const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
`;

export const Slider = styled.input<{ $value?: number }>`
  width: 100%;
  -webkit-appearance: none;
  max-width: 18rem;
  width: 100%;
  height: 10px;
  border-radius: 4px;
  background: ${({ theme, $value }) => `
    linear-gradient(
      to right,
      ${theme.highlight} 0%,
      ${theme.highlight} ${($value / 10) * 100}%,
      ${theme.background} ${($value / 10) * 100}%,
      ${theme.background} 100%
    )
  `};
  outline: none;
  transition: var(--transition);

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 1.2rem;
    width: 1.2rem;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.highlight};
    cursor: pointer;
    border: none;
  }

  &::-moz-range-thumb {
    height: 1.2rem
    width: 1.2rem
    border-radius: 50%;
    background-color: ${({ theme }) => theme.highlight};
    cursor: pointer;
    border: none;
  }

  &::-ms-thumb {
    height: 1.2rem
    width: 1.2rem
    border-radius: 50%;
    background-color: ${({ theme }) => theme.highlight};
    cursor: pointer;
    border: none;
  }
`;
export const SliderDim = styled(Slider)<{ $dim?: number }>`
  background: ${({ theme, $dim }) => `
    linear-gradient(
      to right,
      ${theme.highlight} 0%,
      ${theme.highlight} ${$dim * 100}%,
      ${theme.background} ${$dim * 100}%,
      ${theme.background} 100%
    )
  `};
`;
export const SliderValue = styled.span`
  font-family: var(--font-outfit);
  text-align: right;
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
`;
