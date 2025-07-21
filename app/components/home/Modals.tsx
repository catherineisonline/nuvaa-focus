"use client";
import React from "react";
import MusicModal from "../music-modal/MusicModal";
import SettingsModal from "../settings-modal/SettingsModal";
import TaskModal from "../task-modal/TaskModal";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

export const Modals = () => {
  const isTasksActive = useSelector(
    (state: RootState) => state.navigation.isTasksActive
  );
  const isSettingsActive = useSelector(
    (state: RootState) => state.navigation.isSettingsActive
  );
  const isMusicActive = useSelector(
    (state: RootState) => state.navigation.isMusicActive
  );
  return (
    <React.Fragment>
      {isSettingsActive && <SettingsModal />}
      {isTasksActive && <TaskModal />}
      {isMusicActive && <MusicModal />}
    </React.Fragment>
  );
};
