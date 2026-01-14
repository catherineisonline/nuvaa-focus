import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    form: null,
    errors: null,
    user: null,
    isProfileEditing: false,
    isConfirmationActive: false,
  },
  reducers: {
    setForm(state, action) {
      const { key, value } = action.payload;
      state.form = { ...state.form, [key]: value };
    },
    setIsConfirmationActive(state, action) {
      state.isConfirmationActive = action.payload;
    },
    resetForm(state) {
      state.form = null;
    },
    setErrors(state, action) {
      state.errors = action.payload;
    },
    setIsProfileEditing(state, action) {
      state.isProfileEditing = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

export default profileSlice.reducer;
export const { setForm, setErrors, setIsProfileEditing, setUser, resetForm, setIsConfirmationActive } =
  profileSlice.actions;
