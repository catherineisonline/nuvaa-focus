import { useDispatch, useSelector } from "react-redux";
import { ActionButton, AuthForm, AuthInput, InputError, InputLabel } from "../../Profile.styled";
import { RootState } from "../../../../../redux/store";
import { validate } from "../../helpers/validate";
import { login } from "../../helpers/login";
import { resetForm, setErrors, setForm } from "../../../../../redux/slices/loginSlice";
import { setUser } from "../../../../../redux/slices/profileSlice";

export const Login = () => {
  const dispatch = useDispatch();
  const form = useSelector((state: RootState) => state.login.form);
  const errors = useSelector((state: RootState) => state.login.errors);

  const handleChange = (e: HTMLInputElement) => {
    const { name, value } = e;
    dispatch(setForm({ key: name, value: value }));
  };
  const handleLogin = async () => {
    const validation = validate(form, "login");
    if (Object.keys(validation).length > 0) {
      dispatch(setErrors(validation));
      return;
    }
    try {
      const user = await login(form);
      dispatch(setErrors(null));
      dispatch(resetForm());
      dispatch(setUser(user));
    } catch (error) {
      dispatch(setErrors({ general: error.message || "Login failed!" }));
      console.log(error);
    }
  };
  return (
    <AuthForm>
      {errors?.general && <InputError>{errors.general}</InputError>}
      <InputLabel htmlFor="email">
        Email
        <AuthInput
          name="email"
          id="email"
          placeholder="e.g. bilbob@gmail.com"
          value={form?.email || ""}
          onChange={(e) => handleChange(e.target)}
        />
      </InputLabel>
      {errors?.email && <InputError>{errors.email}</InputError>}
      <InputLabel htmlFor="password">
        Password
        <AuthInput
          name="password"
          id="password"
          placeholder="password min. 8 characters"
          type="password"
          value={form?.password || ""}
          onChange={(e) => handleChange(e.target)}
        />
      </InputLabel>
      {errors?.password && <InputError>{errors.password}</InputError>}
      <ActionButton type="button" onClick={handleLogin}>
        Login
      </ActionButton>
    </AuthForm>
  );
};
