import { SquareX } from "lucide-react";
import "./settings.css";
import { useState } from "react";
import TimerTab from "./timer-tab/TimerTab";

const SettingsModal = ({ setShowSettings, setSettings, settings }) => {
  const [activeTab, setActiveTab] = useState("timer");

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowSettings(false);
    }
  };
  const updateSetting = (key, value) => {
    setSettings((prev) => {
      const settings = { ...prev, [key]: value };
      localStorage.setItem("settings", JSON.stringify(settings));
      return settings;
    });
  };

  return (
    <div className="modal-overlay" onClick={handleOutsideClick}>
      <div
        role="dialog"
        aria-labelledby="settings-title"
        aria-modal="true"
        className="settings-modal single-column">
        <header className="modal-header">
          <h2 id="settings-title">Settings</h2>
          <button
            className="close-btn"
            aria-label="Close"
            onClick={() => setShowSettings(false)}>
            <SquareX size={24} />
          </button>
        </header>
        <div className="modal-body single-column">
          <section className="settings-tabs">
            <button
              className={`tab-btn ${activeTab === "timer" ? "active" : ""}`}
              onClick={() => setActiveTab("timer")}>
              Timer
            </button>
            <button
              className={`tab-btn ${
                activeTab === "appearance" ? "active" : ""
              }`}
              onClick={() => setActiveTab("appearance")}>
              Appearance
            </button>
            <button
              className={`tab-btn ${activeTab === "features" ? "active" : ""}`}
              onClick={() => setActiveTab("features")}>
              Features
            </button>
            <button
              className={`tab-btn ${activeTab === "analytics" ? "active" : ""}`}
              onClick={() => setActiveTab("analytics")}>
              Analytics
            </button>
            <button
              className={`tab-btn ${activeTab === "account" ? "active" : ""}`}
              onClick={() => setActiveTab("account")}>
              Account
            </button>
          </section>
          {activeTab === "timer" && (
            <TimerTab updateSetting={updateSetting} settings={settings} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
