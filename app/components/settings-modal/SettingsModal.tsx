"use client";
import "./Settings.styled.tsx";

import X from "lucide-react/dist/esm/icons/x";
import TimerTab from "./timer-tab/TimerTab";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, toggleModal } from "../../redux/slices/navigationSlice";
import { setIsMusicPlaying, updateSettingsTab } from "../../redux/slices/settingsSlice";
import { RootState } from "../../redux/store";
import {
  CloseButton,
  Modal,
  ModalBody,
  ModalHeader,
  ModalTitle,
  Overlay,
  SettingsTabs,
  TabButton,
} from "./Settings.styled";
import { AppearanceTab } from "./appearance-tab/AppearanceTab";
import { useBackgroundStatus } from "../../hooks/useBackgroundStatus";
import { FeaturesTab } from "./features-tab/FeaturesTab";
import { AnalyticsTab } from "./analytics-tab/AnalyticsTab";
import { useRef } from "react";
import { MusicTab } from "./music-tab/MusicTab";
import ProfileTab from "./profile-tab/ProfileTab";

export const SettingsModal = () => {
  const dispatch = useDispatch();
  const isBackgroundActive = useBackgroundStatus();
  const settingsTab = useSelector((state: RootState) => state.settings.settingsTab);
  const isMusicPlaying = useSelector((state: RootState) => state.settings.isMusicPlaying);
  const changesSavedMsg = useSelector((state: RootState) => state.app.changesSavedMsg);
  const musicEnabled = useSelector((state: RootState) => state.music.musicEnabled);
  const lastTabRef = useRef<HTMLElement>(null);

  const handleSettingsTab = (tab: string) => {
    if (tab === "account") {
      if (lastTabRef.current) {
        lastTabRef.current.scrollLeft = lastTabRef.current.scrollWidth;
      }
    }
    dispatch(updateSettingsTab(tab));
  };

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !musicEnabled) {
      dispatch(toggleModal("isSettingsActive"));
    } else if (e.target === e.currentTarget) {
      dispatch(setIsMusicPlaying(true));
    }
  };
  const handleModalClose = () => {
    if (!musicEnabled) {
      dispatch(closeModal({ target: "isSettingsActive" }));
    } else {
      dispatch(setIsMusicPlaying(true));
    }
  };

  return (
    <Overlay onClick={handleOutsideClick} $isMusicPlaying={isMusicPlaying}>
      <Modal
        $isMusicPlaying={isMusicPlaying}
        $bgImage={isBackgroundActive}
        role="dialog"
        aria-labelledby="settings-title"
        aria-modal="true">
        <ModalHeader>
          <ModalTitle id="settings-title">Settings{changesSavedMsg && <span> {changesSavedMsg}</span>}</ModalTitle>
          <CloseButton aria-label="Close" onClick={handleModalClose}>
            <X size={32} />
          </CloseButton>
        </ModalHeader>
        <ModalBody>
          <SettingsTabs ref={lastTabRef}>
            <TabButton $active={settingsTab === "timer"} onClick={() => handleSettingsTab("timer")}>
              Timer
            </TabButton>
            <TabButton $active={settingsTab === "appearance"} onClick={() => handleSettingsTab("appearance")}>
              Appearance
            </TabButton>
            <TabButton $active={settingsTab === "music"} onClick={() => handleSettingsTab("music")}>
              Music
            </TabButton>
            <TabButton $active={settingsTab === "features"} onClick={() => handleSettingsTab("features")}>
              Features
            </TabButton>
            <TabButton $active={settingsTab === "analytics"} onClick={() => handleSettingsTab("analytics")}>
              Analytics
            </TabButton>
            <TabButton $active={settingsTab === "account"} onClick={() => handleSettingsTab("account")}>
              Account
            </TabButton>
          </SettingsTabs>
          {settingsTab === "timer" && <TimerTab />}
          {settingsTab === "appearance" && <AppearanceTab />}
          {settingsTab === "music" && <MusicTab />}
          {settingsTab === "features" && <FeaturesTab />}
          {settingsTab === "analytics" && <AnalyticsTab />}
          {settingsTab === "account" && <ProfileTab />}
        </ModalBody>
      </Modal>
    </Overlay>
  );
};
