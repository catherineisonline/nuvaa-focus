import styled from "styled-components";

export const SettingsContent = styled.form`
  flex: 1;
  overflow-y: auto;
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
