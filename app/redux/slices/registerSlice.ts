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
      if (action.payload === "reset") {
        state.form = getInitialRegistrationForm();
      }
      const { key, value } = action.payload;
      state.form = { ...state.form, [key]: value };
    },
    setErrors(state, action) {
      state.errors = action.payload;
    },
  },
});

export default registerSlice.reducer;
export const { setForm, setErrors } = registerSlice.actions;
