"use client";
import "./Settings.styled.tsx";
import { X } from "lucide-react";
import TimerTab from "./timer-tab/TimerTab";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, toggleModal } from "../../redux/slices/navigationSlice";
import { updateSettingsTab } from "../../redux/slices/settingsSlice";
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

const SettingsModal = () => {
  const dispatch = useDispatch();
  const settingsTab = useSelector(
    (state: RootState) => state.settings.settingsTab
  );
  const changesSavedMsg = useSelector(
    (state: RootState) => state.app.changesSavedMsg
  );

  const handleSettingsTab = (tab: string) => {
    dispatch(updateSettingsTab({ tab: tab }));
  };

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      dispatch(toggleModal({ target: "isSettingsActive" }));
    }
  };
  const handleModalClose = () => {
    dispatch(closeModal({ target: "isSettingsActive" }));
  };

  return (
    <Overlay onClick={handleOutsideClick}>
      <Modal role="dialog" aria-labelledby="settings-title" aria-modal="true">
        <ModalHeader>
          <ModalTitle id="settings-title">
            Settings{changesSavedMsg && <span> {changesSavedMsg}</span>}
          </ModalTitle>
          <CloseButton aria-label="Close" onClick={handleModalClose}>
            <X size={32} />
          </CloseButton>
        </ModalHeader>
        <ModalBody>
          <SettingsTabs>
            <TabButton
              $active={settingsTab === "timer"}
              onClick={() => handleSettingsTab("timer")}>
              Timer
            </TabButton>
            <TabButton
              $active={settingsTab === "appearance"}
              onClick={() => handleSettingsTab("appearance")}>
              Appearance
            </TabButton>
            <TabButton
              $active={settingsTab === "features"}
              onClick={() => handleSettingsTab("features")}>
              Features
            </TabButton>
            <TabButton
              $active={settingsTab === "analytics"}
              onClick={() => handleSettingsTab("analytics")}>
              Analytics
            </TabButton>
            <TabButton
              $active={settingsTab === "account"}
              onClick={() => handleSettingsTab("account")}>
              Account
            </TabButton>
          </SettingsTabs>
          {settingsTab === "timer" && <TimerTab />}
          {settingsTab === "appearance" && <AppearanceTab />}
        </ModalBody>
      </Modal>
    </Overlay>
  );
};

export default SettingsModal;
