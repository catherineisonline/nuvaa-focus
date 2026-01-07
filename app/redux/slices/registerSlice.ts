import { createSlice } from "@reduxjs/toolkit";
const REGISTRATIONFORM = {
  fullname: "",
  email: "",
  password: "",
  repeatPassword: "",
};
export const registerSlice = createSlice({
  name: "register",
  initialState: {
    form: REGISTRATIONFORM,
    errors: null,
  },
  reducers: {
    setForm(state, action) {
      if (action.payload === "reset") {
        state.form = REGISTRATIONFORM;
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
