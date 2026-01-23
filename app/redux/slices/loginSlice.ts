import { createSlice } from "@reduxjs/toolkit";
const getInitialLoginForm = () => ({
  email: "",
  password: "",
});
export const loginSlice = createSlice({
  name: "login",
  initialState: {
    form: getInitialLoginForm(),
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
    resetLoginForm(state) {
      state.form = getInitialLoginForm();
    },
  },
});

export default loginSlice.reducer;
export const { setForm, setErrors, setActiveTab, resetLoginForm } = loginSlice.actions;
