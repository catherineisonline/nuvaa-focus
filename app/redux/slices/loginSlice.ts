import { createSlice } from "@reduxjs/toolkit";
const LOGINFORM = {
  email: "",
  password: "",
};
export const loginSlice = createSlice({
  name: "login",
  initialState: {
    form: LOGINFORM,
    errors: null,
    activeTab: "login",
  },
  reducers: {
    setForm(state, action) {
      const { key, value } = action.payload;
      state.form = { ...state.form, [key]: value };
    },
    setErrors(state, action) {
      state.errors = action.payload;
    },
    setActiveTab(state, action) {
      state.activeTab = action.payload;
    },
  },
});

export default loginSlice.reducer;
export const { setForm, setErrors, setActiveTab } = loginSlice.actions;
