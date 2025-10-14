"use client";

import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import dynamic from "next/dynamic";
import React from "react";
import Focus from "./Focus";

import { Quotes } from "./quote/Quote";
const StopWatch = dynamic(() => import("./Stopwatch"));
const Clock = dynamic(() => import("./Clock"));
export const ModeTime = () => {
  const currentTab = useSelector((state: RootState) => state.app.currentTab);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };
  return (
    <React.Fragment>
      <Quotes />
      {currentTab === "focus" ? (
        <Focus />
      ) : currentTab === "stopwatch" ? (
        <StopWatch formatTime={formatTime} />
      ) : (
        <Clock />
      )}
    </React.Fragment>
  );
};
