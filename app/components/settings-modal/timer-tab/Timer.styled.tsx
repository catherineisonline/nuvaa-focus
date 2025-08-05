"use client";
import styled from "styled-components";
import { media } from "../../../styles/breakpoints";
import { GroupBase, StylesConfig } from "react-select";
import { ThemeType } from "../../../styles/themes";
import { OptionType } from "../../../types/react-select";

export const SettingsContent = styled.form`
  overflow-y: auto;
  width: 50%;
  @media ${media.md} {
    width: 90%;
  }
`;

export const SettingGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

export const SettingLabel = styled.label`
  display: block;
  font-weight: 400;
  color: ${({ theme }) => theme.text};
  font-size: 1.2rem;
  font-family: var(--font-outfit);
`;

export const RadioGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

export const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-weight: normal;
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  cursor: pointer;
  font-size: 1rem;
`;

export const createCustomStyles = (
  theme: ThemeType
): StylesConfig<OptionType, false, GroupBase<OptionType>> => ({
  control: (provided) => ({
    ...provided,
    backgroundColor: theme.inputInner,
    borderColor: "#ccc",
    minWidth: "10rem",
    cursor: "pointer",
    boxShadow: "none",
    "&:hover, &:focus": {
      borderColor: "#888",
    },
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: theme.inputInner,
    maxHeight: "20rem",
    overflowY: "auto",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: theme.inputInner,
    color: state.isSelected ? theme.highlight : theme.text,
    fontWeight: state.isSelected ? "600" : "400",
    padding: "10px",
    cursor: "pointer",
    "&:hover": {
      color: theme.highlight,
      backgroundColor: theme.background,
    },
  }),
});
