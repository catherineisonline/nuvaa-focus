import { useDispatch, useSelector } from "react-redux";
import "./timer.css";
import { updateSettings } from "@/app/redux/slices/settingsSlice";

const TimerTab = () => {
  const settings = useSelector((state) => state.settings);
  const dispatch = useDispatch();
  const updateSetting = (k, v) => {
    dispatch(updateSettings({ key: k, value: v }));
  };

  return (
    <section className="settings-content">
      <article className="setting-group">
        <label htmlFor="focusTime" className="setting-label">
          Focus Time (minutes)
        </label>
        <input
          id="focusTime"
          type="number"
          min="1"
          max="120"
          value={settings.focusTime}
          onChange={(e) => updateSetting("focusTime", parseInt(e.target.value))}
          className="setting-input"
        />
      </article>

      <article className="setting-group">
        <label htmlFor="shortBreakTime" className="setting-label">
          Short Break (minutes)
        </label>
        <input
          id="shortBreakTime"
          type="number"
          min="1"
          max="120"
          value={settings.shortBreakTime}
          onChange={(e) =>
            updateSetting("shortBreakTime", parseInt(e.target.value))
          }
          className="setting-input"
        />
      </article>

      <article className="setting-group">
        <label htmlFor="longBreakTime" className="setting-label">
          Long Break (minutes)
        </label>
        <input
          id="longBreakTime"
          type="number"
          min="1"
          max="120"
          value={settings.longBreakTime}
          onChange={(e) =>
            updateSetting("longBreakTime", parseInt(e.target.value))
          }
          className="setting-input"
        />
      </article>

      <article className="setting-group">
        <h3 className="setting-label">Time Format</h3>
        <div className="radio-group">
          <label htmlFor="is12Hour" className="radio-label">
            <input
              id="is12Hour"
              type="radio"
              checked={!settings.is24Hour}
              onChange={() => updateSetting("is24Hour", false)}
            />
            12 Hour
          </label>
          <label htmlFor="is24Hour" className="radio-label">
            <input
              id="is24Hour"
              type="radio"
              checked={settings.is24Hour}
              onChange={() => updateSetting("is24Hour", true)}
            />
            24 Hour
          </label>
        </div>
      </article>

      <article className="setting-group">
        <label htmlFor="autoStartNext" className="checkbox-label">
          <input
            id="autoStartNext"
            type="checkbox"
            checked={settings.autoStartNext}
            onChange={(e) => updateSetting("autoStartNext", e.target.checked)}
          />
          Auto-start next interval
        </label>
      </article>
    </section>
  );
};

export default TimerTab;
