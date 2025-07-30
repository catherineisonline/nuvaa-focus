"use client";
import { ThemeProvider } from "styled-components";
import { themes } from "../styles/themes";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTheme } from "../redux/slices/appearanceSlice";
import { RootState } from "../redux/store";
import { GlobalStyles } from "../styles/GlobalStyles";

export default function ThemeWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const currentTheme = useSelector(
    (state: RootState) => state.appearance.currentTheme
  );
  const currentBackground = useSelector(
    (state: RootState) => state.appearance.currentBackground
  );
  const backgroundBlur = useSelector(
    (state: RootState) => state.appearance.backgroundBlur
  );
  const backgroundDim = useSelector(
    (state: RootState) => state.appearance.backgroundDim
  );

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored && themes[stored]) {
      dispatch(setCurrentTheme(stored));
    }
  }, [dispatch]);

  return (
    <ThemeProvider theme={themes[currentTheme]}>
      <GlobalStyles
        $bgImage={currentBackground}
        $backgroundDim={backgroundDim}
        $backgroundBlur={backgroundBlur}
      />
      {children}
    </ThemeProvider>
  );
}
