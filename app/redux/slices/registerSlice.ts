import { createSlice } from "@reduxjs/toolkit";

const getInitialRegistrationForm = () => ({
  fullname: "",
  email: "",
  password: "",
  repeatPassword: "",
});
export const registerSlice = createSlice({
  name: "register",
  initialState: {
    form: getInitialRegistrationForm(),
    errors: null,
  },
  reducers: {
    setForm(state, action) {
      const { key, value } = action.payload;
      state.form = { ...state.form, [key]: value };
    },
    setErrors(state, action) {
      state.errors = action.payload;
    },
    resetRegisterForm(state) {
      state.form = getInitialRegistrationForm();
    },
  },
});

export default registerSlice.reducer;
export const { setForm, setErrors, resetRegisterForm } = registerSlice.actions;
