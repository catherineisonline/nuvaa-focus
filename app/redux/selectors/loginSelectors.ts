import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const selectLoginForm = (state: RootState) => state.login.form;
export const selectLoginErrors = (state: RootState) => state.login.errors;
export const selectLoginActiveTab = (state: RootState) => state.login.activeTab;
export const loginSelectors = createSelector(
  [selectLoginForm, selectLoginErrors, selectLoginActiveTab],
  (form, errors, activeTab) => ({
    form,
    errors,
    activeTab,
  }),
);
