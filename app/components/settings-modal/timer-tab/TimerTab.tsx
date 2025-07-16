import "./timer.css";
import { useDispatch, useSelector } from "react-redux";
import { updateSettings } from "../../../redux/slices/settingsSlice";
import { updateChangesSavedMsg } from "../../../redux/slices/appSlice";
import { debounce } from "lodash";
import { useEffect } from "react";
import { RootState } from "../../../redux/store";

const TimerTab = () => {
  const dispatch = useDispatch();
  const settings = useSelector((state: RootState) => state.settings);
  const changesSavedMsg = useSelector(
    (state: RootState) => state.app.changesSavedMsg
  );
  const updateSetting = (k: string, v: number | boolean) => {
    dispatch(updateSettings({ key: k, value: v }));
    showMessage();
  };

  const showMessage = debounce(() => {
    dispatch(updateChangesSavedMsg({ msg: "Successfully updated" }));
  }, 1000);

  useEffect(() => {
    if (!changesSavedMsg) return;
    const timer = setTimeout(() => {
      dispatch(updateChangesSavedMsg({ msg: "" }));
    }, 2000);
    return () => clearTimeout(timer);
  }, [changesSavedMsg, dispatch]);
  return (
    <form className="settings-content">
      <div className="setting-group">
        <label htmlFor="focusTime" className="setting-label">
          Focus Time
        </label>
        <select
          className="setting-input"
          id="focusTime"
          name="focusTime"
          value={settings.focusTime}
          onChange={(e) =>
            updateSetting("focusTime", parseInt(e.target.value))
          }>
          {Array.from({ length: 480 }, (_, i) => (
            <option key={i + 1} value={(i + 1) * 60}>
              {i + 1} {i === 0 ? "Minute" : "Minutes"}
            </option>
          ))}
        </select>
      </div>

      <div className="setting-group">
        <label htmlFor="shortBreakTime" className="setting-label">
          Short Break
        </label>
        <select
          className="setting-input"
          id="shortBreakTime"
          name="shortBreakTime"
          value={settings.shortBreakTime}
          onChange={(e) =>
            updateSetting("shortBreakTime", parseInt(e.target.value))
          }>
          {Array.from({ length: 480 }, (_, i) => (
            <option key={i + 1} value={(i + 1) * 60}>
              {i + 1} {i === 0 ? "Minute" : "Minutes"}
            </option>
          ))}
        </select>
      </div>

      <div className="setting-group">
        <label htmlFor="longBreakTime" className="setting-label">
          Long Break
        </label>
        <select
          className="setting-input"
          id="longBreakTime"
          name="longBreakTime"
          value={settings.longBreakTime}
          onChange={(e) =>
            updateSetting("longBreakTime", parseInt(e.target.value))
          }>
          {Array.from({ length: 480 }, (_, i) => (
            <option key={i + 1} value={(i + 1) * 60}>
              {i + 1} {i === 0 ? "Minute" : "Minutes"}
            </option>
          ))}
        </select>
      </div>

      <div className="setting-group">
        <h3 className="setting-label">Time Format</h3>
        <div className="radio-group">
          <label htmlFor="is12Hour" className="radio-label">
            <input
              id="is12Hour"
              type="radio"
              name="is24Hour"
              checked={!settings.is24Hour}
              onChange={() => updateSetting("is24Hour", false)}
            />
            12 Hour
          </label>
          <label htmlFor="is24Hour" className="radio-label">
            <input
              id="is24Hour"
              type="radio"
              name="is24Hour"
              checked={settings.is24Hour}
              onChange={() => updateSetting("is24Hour", true)}
            />
            24 Hour
          </label>
        </div>
      </div>

      <div className="setting-group">
        <label htmlFor="autoStartNext" className="checkbox-label">
          <input
            id="autoStartNext"
            type="checkbox"
            name="autoStartNext"
            checked={settings.autoStartNext}
            onChange={(e) => updateSetting("autoStartNext", e.target.checked)}
          />
          Auto-start next interval
        </label>
      </div>
    </form>
  );
};

export default TimerTab;
