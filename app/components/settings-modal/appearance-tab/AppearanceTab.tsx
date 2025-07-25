import { useDispatch, useSelector } from "react-redux";
import { themes } from "../../../styles/themes";
import { setCurrentTheme } from "../../../redux/slices/appearanceSlice";
import { RootState } from "../../../redux/store";
import {
  SectionHeading,
  SettingGroup,
  SettingsContent,
  ThemeGrid,
  ThemeLabel,
  ThemeOption,
} from "./Appearance.styled";
export const AppearanceTab = () => {
  const dispatch = useDispatch();
  const currentTheme = useSelector(
    (state: RootState) => state.appearance.currentTheme
  );
  const handleThemeChange = (name: string) => {
    dispatch(setCurrentTheme({ name: name }));
  };
  return (
    <SettingsContent>
      <SettingGroup>
        <SectionHeading>Color Theme</SectionHeading>
        <ThemeGrid>
          {Object.values(themes).map((theme) => (
            <ThemeOption
              type="button"
              key={theme.name}
              aria-label={`Select theme ${theme.name}`}
              $active={currentTheme === theme.name}
              $colorBackground={theme.backgroundGradientTimer}
              $colorBorder={theme.highlight}
              onClick={() => handleThemeChange(theme.name)}>
              <ThemeLabel>{theme.name.toUpperCase()}</ThemeLabel>
            </ThemeOption>
          ))}
        </ThemeGrid>
      </SettingGroup>
    </SettingsContent>
  );
};
