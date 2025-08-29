"use client";
import { ThemeProvider } from "styled-components";
import { ThemeType } from "../styles/themes";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTheme } from "../redux/slices/appearanceSlice";
import { RootState } from "../redux/store";
import { GlobalStyles } from "../styles/GlobalStyles";

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const currentTheme = useSelector((state: RootState) => state.appearance.currentTheme);
  const currentBackground = useSelector((state: RootState) => state.appearance.currentBackground);
  const backgroundBlur = useSelector((state: RootState) => state.appearance.backgroundBlur);
  const backgroundDim = useSelector((state: RootState) => state.appearance.backgroundDim);

  const [themeObject, setThemeObject] = useState<ThemeType>(null);

  useEffect(() => {
    import(`../styles/themes`).then((mod) => setThemeObject(mod[currentTheme]));
  }, [currentTheme]);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored) {
      dispatch(setCurrentTheme(stored));
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
