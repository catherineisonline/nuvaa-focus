import { createSlice } from "@reduxjs/toolkit";
import { ONBOARDING_STEPS } from "../../lib/constants";

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState: {
    currentStep: 0,
    isOnboardingActive: false,
  },
  reducers: {
    setNextStep(state, action) {
      const val = action.payload.value;
      state.currentStep = val;
    },
    toggleModal(state, action) {
      const val = action.payload.value;
      state.isOnboardingActive = val;
    },
    setOnboarding(state, action) {
      const val = action.payload.value;
      state.isOnboardingActive = val;
    },
  },
});
export default onboardingSlice.reducer;
export const { setNextStep, toggleModal, setOnboarding } =
  onboardingSlice.actions;
