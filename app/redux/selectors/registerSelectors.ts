import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const selectRegisterForm = (state: RootState) => state.register.form;
export const selectRegisterErrors = (state: RootState) => state.register.errors;
export const registerSelectors = createSelector([selectRegisterForm, selectRegisterErrors], (form, errors) => ({
  form,
  errors,
}));
