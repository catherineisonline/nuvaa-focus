import { createSlice } from "@reduxjs/toolkit";

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState: {
    currentStep: 0,
    isOnboardingActive: false,
  },
  reducers: {
    setNextStep(state, action) {
      state.currentStep = action.payload;
    },
    toggleOnboarding(state, action) {
      state.isOnboardingActive = action.payload;
    },
    setOnboarding(state, action) {
      state.isOnboardingActive = action.payload;
    },
  },
});
export default onboardingSlice.reducer;
export const { setNextStep, toggleOnboarding, setOnboarding } = onboardingSlice.actions;
