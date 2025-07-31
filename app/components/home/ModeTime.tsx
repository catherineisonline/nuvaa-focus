"use client";

import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import StopWatch from "./Stopwatch";
import React from "react";
import Focus from "./Focus";
import Clock from "./Clock";
import { Quotes } from "./quote/Quote";

export const ModeTime = () => {
  const currentTab = useSelector((state: RootState) => state.app.currentTab);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };
  return (
    <React.Fragment>
      <Quotes />
      {currentTab === "focusTime" ? (
        <Focus formatTime={formatTime} />
      ) : currentTab === "stopwatch" ? (
        <StopWatch formatTime={formatTime} />
      ) : (
        <Clock />
      )}
    </React.Fragment>
  );
};
