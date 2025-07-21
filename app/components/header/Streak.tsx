"use client";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import React from "react";

export const Streak = () => {
  const streak = useSelector((state: RootState) => state.app.streak);
  return (
    <React.Fragment>
      <span>{streak}</span>
    </React.Fragment>
  );
};
