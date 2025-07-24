"use client";
import styled from "styled-components";

export const SettingsContent = styled.form`
  overflow-y: auto;
`;

export const SettingGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const SettingLabel = styled.label`
  display: block;
  font-weight: 400;
  color: ${({ theme }) => theme.text};
  font-size: 1.2rem;
  font-family: var(--font-outfit);
`;

export const Input = styled.select`
  padding: 0.5rem;
  border: 1px solid var(--shadow-light);
  border-radius: 8px;
  background-color: transparent;
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
  transition: var(--transition);
  width: 10rem;
  cursor: pointer;
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.highlight};
    box-shadow: ${({ theme }) => theme.highlight};
  }
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
