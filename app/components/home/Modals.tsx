"use client";
import React from "react";
import dynamic from "next/dynamic";

import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
const ControlsModal = dynamic(() => import("../controls-modal/ControlsModal").then((mod) => mod.ControlsModal), {
  ssr: false,
});
const TaskModal = dynamic(() => import("../task-modal/TaskModal").then((mod) => mod.TaskModal), { ssr: false });
const SettingsModal = dynamic(() => import("../settings-modal/SettingsModal").then((mod) => mod.SettingsModal), {
  ssr: false,
});
const Onboarding = dynamic(() => import("../onboarding/Onboarding").then((mod) => mod.Onboarding), { ssr: false });

export const Modals = () => {
  const isTasksActive = useSelector((state: RootState) => state.navigation.isTasksActive);
  const isSettingsActive = useSelector((state: RootState) => state.navigation.isSettingsActive);
  const isHamburgerActive = useSelector((state: RootState) => state.navigation.isHamburgerActive);
  const isOnboardingActive = useSelector((state: RootState) => state.onboarding.isOnboardingActive);
  return (
    <React.Fragment>
      {isSettingsActive && <SettingsModal />}
      {isTasksActive && <TaskModal />}
      {isHamburgerActive && <ControlsModal />}
      {isOnboardingActive && <Onboarding />}
    </React.Fragment>
  );
};
