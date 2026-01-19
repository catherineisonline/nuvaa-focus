import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const selectProfileForm = (state: RootState) => state.profile.form;
export const selectProfileErrors = (state: RootState) => state.profile.errors;
export const selectProfileUser = (state: RootState) => state.profile.user;
export const selectProfileIsProfileEditing = (state: RootState) => state.profile.isProfileEditing;
export const selectProfileIsConfirmationActive = (state: RootState) => state.profile.isConfirmationActive;
export const profileSelectors = createSelector(
  [
    selectProfileForm,
    selectProfileErrors,
    selectProfileUser,
    selectProfileIsProfileEditing,
    selectProfileIsConfirmationActive,
  ],
  (form, errors, user, isProfileEditing, isConfirmationActive) => ({
    form,
    errors,
    user,
    isProfileEditing,
    isConfirmationActive,
  }),
);
