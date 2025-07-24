"use client";
import { ThemeProvider } from "styled-components";
import { themes } from "../styles/themes";
import { useEffect, useState } from "react";

export default function ThemeWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentTheme, setCurrentTheme] = useState("primary");

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored && themes[stored]) {
      setCurrentTheme(stored);
    }
  }, []);

  return <ThemeProvider theme={themes[currentTheme]}>{children}</ThemeProvider>;
}
