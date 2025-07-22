import "./Timer.styled.tsx";
import { useDispatch, useSelector } from "react-redux";
import { updateSettings } from "../../../redux/slices/settingsSlice";
import { updateChangesSavedMsg } from "../../../redux/slices/appSlice";
import { debounce } from "lodash";
import { useEffect } from "react";
import { RootState } from "../../../redux/store";
import {
  CheckboxLabel,
  Input,
  RadioGroup,
  RadioLabel,
  SettingGroup,
  SettingLabel,
  SettingsContent,
} from "./Timer.styled";

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
    <SettingsContent>
      <SettingGroup>
        <SettingLabel htmlFor="focusTime">Focus Time</SettingLabel>
        <Input
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
        </Input>
      </SettingGroup>

      <SettingGroup>
        <SettingLabel htmlFor="shortBreakTime">Short Break</SettingLabel>
        <Input
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
        </Input>
      </SettingGroup>

      <SettingGroup>
        <SettingLabel htmlFor="longBreakTime">Long Break</SettingLabel>
        <Input
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
        </Input>
      </SettingGroup>

      <SettingGroup>
        <SettingLabel as="h3">Time Format</SettingLabel>
        <RadioGroup>
          <RadioLabel htmlFor="is12Hour">
            <input
              id="is12Hour"
              type="radio"
              name="is24Hour"
              checked={!settings.is24Hour}
              onChange={() => updateSetting("is24Hour", false)}
            />
            12 Hour
          </RadioLabel>
          <RadioLabel htmlFor="is24Hour">
            <input
              id="is24Hour"
              type="radio"
              name="is24Hour"
              checked={settings.is24Hour}
              onChange={() => updateSetting("is24Hour", true)}
            />
            24 Hour
          </RadioLabel>
        </RadioGroup>
      </SettingGroup>

      <SettingGroup>
        <CheckboxLabel htmlFor="autoStartNext">
          <input
            id="autoStartNext"
            type="checkbox"
            name="autoStartNext"
            checked={settings.autoStartNext}
            onChange={(e) => updateSetting("autoStartNext", e.target.checked)}
          />
          Auto-start next interval
        </CheckboxLabel>
      </SettingGroup>
    </SettingsContent>
  );
};

export default TimerTab;
