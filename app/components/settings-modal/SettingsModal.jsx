import { SquareX } from "lucide-react";
import "./settings.css";
import { useState } from "react";

const SettingsModal = ({ setShowSettings }) => {
  const [activeTab, setActiveTab] = useState("timer");

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowSettings(false);
    }
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
        <section className="modal-body single-column">
          <div className="settings-tabs">
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
          </div>
        </section>
      </div>
    </div>
  );
};

export default SettingsModal;
