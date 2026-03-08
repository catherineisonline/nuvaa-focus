import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const selectProfileForm = (state: RootState) => state.profile.form;
export const selectProfileErrors = (state: RootState) => state.profile.errors;
export const selectProfileUser = (state: RootState) => state.profile.user;
export const selectProfileIsConfirmationActive = (state: RootState) => state.profile.isConfirmationActive;
export const profileSelectors = createSelector(
  [selectProfileForm, selectProfileErrors, selectProfileUser, selectProfileIsConfirmationActive],
  (form, errors, user, isConfirmationActive) => ({
    form,
    errors,
    user,

    isConfirmationActive,
  }),
);
