"use client";
import styled from "styled-components";
import { media } from "../../../styles/breakpoints";
import { GroupBase, StylesConfig } from "react-select";
import { ThemeType } from "../../../types/themes";
import { OptionType } from "../../../types/react-select";

export const SettingsContent = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-bottom: 10rem;
  @media ${media.md} {
    padding-bottom: 3rem;
  }
`;
export const SettingGroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  h3 {
    font-weight: 600;
    color: ${({ theme }) => theme.text};
    font-size: 1.3rem;
    font-family: var(--font-outfit);
  }
`;
export const SettingGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
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
  user-select: none;
  color: ${({ theme }) => theme.text};
`;
export const Checkbox = styled.input`
  display: none;

  &:not(:checked) + span {
    background-color: transparent;
  }

  &:not(:checked) + span::after {
    content: none;
  }
  &:checked + span {
    background-color: ${({ theme }) => theme.highlight};
    border-color: ${({ theme }) => theme.highlight};
  }

  &:checked + span::after {
    content: "";
    position: absolute;
    left: 5px;
    top: 1px;
    width: 6px;
    height: 10px;
    border-style: solid;
    border-color: ${({ theme }) => theme.background};
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
`;

export const Checkmark = styled.span`
  width: 1.2rem;
  height: 1.2rem;
  border-style: solid;
  border-width: 2px;
  border-color: ${({ theme }) => theme.text};
  background-color: transparent;
  border-radius: 4px;
  position: relative;
  flex-shrink: 0;
  &::after {
    content: none;
  }
`;

export const createCustomStyles = (theme: ThemeType): StylesConfig<OptionType, false, GroupBase<OptionType>> => ({
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
