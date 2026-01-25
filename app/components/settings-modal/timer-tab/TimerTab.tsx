import "./Timer.styled.tsx";
import { useDispatch, useSelector } from "react-redux";
import { updateSettings } from "../../../redux/slices/settingsSlice";
import { setCurrentTab, updateChangesSavedMsg } from "../../../redux/slices/appSlice";
import { debounce } from "lodash";
import { useEffect, useMemo } from "react";
import { RootState } from "../../../redux/store";
import Select from "react-select";
import {
  Checkbox,
  CheckboxLabel,
  Checkmark,
  createCustomStyles,
  SettingGroup,
  SettingGroupContainer,
  SettingLabel,
  SettingsContent,
} from "./Timer.styled";
import { useTheme } from "styled-components";
import { TIMER_OPTIONS } from "../../../lib/constants";
import { settingsSelectors } from "../../../redux/selectors/settingsSelectors";

const MODE_OPTIONS = [
  { value: 0, label: "Focus" },
  { value: 1, label: "Stopwatch" },
  { value: 2, label: "Clock" },
];

const TimerTab = () => {
  const dispatch = useDispatch();
  const { focusTime, shortBreakTime, longBreakTime, is24Hour, autoStartNext } = useSelector(settingsSelectors);
  const currentTab = useSelector((state: RootState) => state.app.currentTab);
  const changesSavedMsg = useSelector((state: RootState) => state.app.changesSavedMsg);
  const theme = useTheme();
  const customStyles = createCustomStyles(theme);
  const defaultMode = MODE_OPTIONS.find((val) => val.label.toLowerCase() === currentTab?.toLowerCase());

  const defaultLongBreak = TIMER_OPTIONS.find((opt) => opt.value === longBreakTime);
  const defaultShortBreakTime = TIMER_OPTIONS.find((opt) => opt.value === shortBreakTime);
  const defaultFocusTime = TIMER_OPTIONS.find((opt) => opt.value === focusTime);
  const TIME_OPTIONS = [
    { value: 0, label: "12-Hour" },
    { value: 1, label: "24-Hour" },
  ];
  const time_label = is24Hour ? TIME_OPTIONS[1] : TIME_OPTIONS[0];

  const updateFormat = (k: number) => {
    dispatch(updateSettings({ key: k }));
    showMessage();
  };
  const updateSetting = (key: string, value: boolean | number) => {
    dispatch(updateSettings({ key, value }));
    showMessage();
  };
  const updateMode = (v: string) => {
    dispatch(setCurrentTab(v.toLowerCase()));
  };
  const showMessage = useMemo(
    () =>
      debounce(() => {
        dispatch(updateChangesSavedMsg("Successfully updated"));
      }, 1000),
    [dispatch],
  );
  useEffect(() => {
    return () => {
      showMessage.cancel();
      dispatch(updateChangesSavedMsg(""));
    };
  }, [showMessage]);

  useEffect(() => {
    if (!changesSavedMsg) return;
    const timer = setTimeout(() => {
      dispatch(updateChangesSavedMsg(""));
    }, 2000);
    return () => clearTimeout(timer);
  }, [changesSavedMsg, dispatch]);
  return (
    <SettingsContent>
      <SettingGroupContainer>
        <h3>General</h3>
        <SettingGroup>
          <SettingLabel htmlFor="mode">Mode</SettingLabel>
          <Select
            styles={customStyles}
            options={MODE_OPTIONS}
            defaultValue={defaultMode}
            onChange={(e) => {
              if (e) {
                updateMode(e.label);
              }
            }}
          />
        </SettingGroup>
        <SettingGroup>
          <SettingLabel htmlFor="time">Time Format</SettingLabel>
          <Select
            styles={customStyles}
            options={TIME_OPTIONS}
            defaultValue={time_label}
            onChange={(e) => {
              if (e) {
                updateFormat(e.value);
              }
            }}
          />
        </SettingGroup>
      </SettingGroupContainer>
      <SettingGroupContainer>
        <h3>Focus</h3>
        <SettingGroup>
          <SettingLabel htmlFor="focus">Focus Time</SettingLabel>
          <Select
            styles={customStyles}
            options={TIMER_OPTIONS}
            defaultValue={defaultFocusTime}
            onChange={(e) => {
              if (e) {
                updateSetting("focus", e.value);
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
      </SettingGroupContainer>

      <SettingGroup>
        <CheckboxLabel htmlFor="autoStartNext">
          <Checkbox
            id="autoStartNext"
            type="checkbox"
            name="autoStartNext"
            checked={autoStartNext}
            onChange={(e) => updateSetting("autoStartNext", e.target.checked)}
          />
          <Checkmark></Checkmark>
          Auto-start next interval
        </CheckboxLabel>
      </SettingGroup>
    </SettingsContent>
  );
};

export default TimerTab;
