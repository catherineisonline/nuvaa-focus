import "./Timer.styled.tsx";
import { useDispatch, useSelector } from "react-redux";
import { updateSettings } from "../../../redux/slices/settingsSlice";
import { updateChangesSavedMsg } from "../../../redux/slices/appSlice";
import { debounce } from "lodash";
import { useEffect } from "react";
import { RootState } from "../../../redux/store";
import Select from "react-select";
import {
  CheckboxLabel,
  createCustomStyles,
  RadioGroup,
  RadioLabel,
  SettingGroup,
  SettingLabel,
  SettingsContent,
} from "./Timer.styled";
import { useTheme } from "styled-components";
import { TIMER_OPTIONS } from "../../../lib/constants";

const TimerTab = () => {
  const dispatch = useDispatch();
  const settings = useSelector((state: RootState) => state.settings);

  const theme = useTheme();
  const customStyles = createCustomStyles(theme);

  const defaultLongBreak = TIMER_OPTIONS.find(
    (opt) => opt.value === settings.longBreakTime
  );
  const defaultShortBreakTime = TIMER_OPTIONS.find(
    (opt) => opt.value === settings.shortBreakTime
  );
  const defaultFocusTime = TIMER_OPTIONS.find(
    (opt) => opt.value === settings.focusTime
  );

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
        <Select
          styles={customStyles}
          options={TIMER_OPTIONS}
          defaultValue={defaultFocusTime}
          onChange={(e) => {
            if (e) {
              updateSetting("focusTime", e.value);
            }
          }}
        />
      </SettingGroup>

      <SettingGroup>
        <SettingLabel htmlFor="shortBreakTime">Short Break</SettingLabel>
        <Select
          styles={customStyles}
          options={TIMER_OPTIONS}
          defaultValue={defaultShortBreakTime}
          onChange={(e) => {
            if (e) {
              updateSetting("shortBreakTime", e.value);
            }
          }}
        />
      </SettingGroup>

      <SettingGroup>
        <SettingLabel htmlFor="longBreakTime">Long Break</SettingLabel>
        <Select
          styles={customStyles}
          options={TIMER_OPTIONS}
          defaultValue={defaultLongBreak}
          onChange={(e) => {
            if (e) {
              updateSetting("longBreakTime", e.value);
            }
          }}
        />
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
