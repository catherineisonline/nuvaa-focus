"use client";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import React from "react";
import { StreakSpan } from "./Header.styled";

export const Streak = () => {
  const streak = useSelector((state: RootState) => state.app.streak);
  return <StreakSpan>{streak}</StreakSpan>;
};
