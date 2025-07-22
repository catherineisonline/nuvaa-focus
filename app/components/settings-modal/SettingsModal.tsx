"use client";
import "./settings.css";
import { X } from "lucide-react";
import TimerTab from "./timer-tab/TimerTab";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, toggleModal } from "../../redux/slices/navigationSlice";
import { updateSettingsTab } from "../../redux/slices/settingsSlice";
import { RootState } from "../../redux/store";

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
    <div className="modal-overlay" onClick={handleOutsideClick}>
      <div
        role="dialog"
        aria-labelledby="settings-title"
        aria-modal="true"
        className="modal neu-modal">
        <header className="modal-header">
          <h2 id="settings-title">
            Settings{changesSavedMsg && <span> {changesSavedMsg}</span>}
          </h2>
          <button
            className="close-btn"
            aria-label="Close"
            onClick={handleModalClose}>
            <X size={32} />
          </button>
        </header>
        <div className="modal-body single-column">
          <section className="settings-tabs neu-mode-inner">
            <button
              className={`tab-btn ${settingsTab === "timer" ? "active" : ""}`}
              onClick={() => handleSettingsTab("timer")}>
              Timer
            </button>
            <button
              className={`tab-btn ${
                settingsTab === "appearance" ? "active" : ""
              }`}
              onClick={() => handleSettingsTab("appearance")}>
              Appearance
            </button>
            <button
              className={`tab-btn ${
                settingsTab === "features" ? "active" : ""
              }`}
              onClick={() => handleSettingsTab("features")}>
              Features
            </button>
            <button
              className={`tab-btn ${
                settingsTab === "analytics" ? "active" : ""
              }`}
              onClick={() => handleSettingsTab("analytics")}>
              Analytics
            </button>
            <button
              className={`tab-btn ${settingsTab === "account" ? "active" : ""}`}
              onClick={() => handleSettingsTab("account")}>
              Account
            </button>
          </section>
          {settingsTab === "timer" && <TimerTab />}
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
