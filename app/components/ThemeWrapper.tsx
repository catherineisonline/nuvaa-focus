"use client";
import { ThemeProvider } from "styled-components";
import { ThemeType } from "../styles/themes";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTheme } from "../redux/slices/appearanceSlice";
import { GlobalStyles } from "../styles/GlobalStyles";
import { appearanceSelectors } from "../redux/selectors/appearanceSelectors";

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const { currentTheme, currentBackground, backgroundBlur, backgroundDim } = useSelector(appearanceSelectors);
  const [themeObject, setThemeObject] = useState<ThemeType>(null);

  useEffect(() => {
    import(`../styles/themes`).then((mod) => setThemeObject(mod[currentTheme]));
  }, [currentTheme]);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored) {
      dispatch(setCurrentTheme({ name: stored }));
    }
  }, [dispatch]);

  if (!currentTheme || !themeObject) return null;

  return (
    <ThemeProvider theme={themeObject}>
      <GlobalStyles $bgImage={currentBackground} $backgroundDim={backgroundDim} $backgroundBlur={backgroundBlur} />
      {children}
    </ThemeProvider>
  );
}
