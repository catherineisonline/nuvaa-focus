import { useDispatch, useSelector } from "react-redux";
import { PrimaryButton, AuthForm, AuthInput, AuthError, AuthLabel } from "../../Profile.styled";
import { validate } from "../../helpers/validate";
import { login } from "../../helpers/login";
import { resetLoginForm, setErrors, setForm } from "../../../../../redux/slices/loginSlice";
import { setUser } from "../../../../../redux/slices/profileSlice";
import { loginSelectors } from "../../../../../redux/selectors/loginSelectors";

export const Login = () => {
  const dispatch = useDispatch();
  const { form, errors } = useSelector(loginSelectors);
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
      dispatch(resetLoginForm());
      dispatch(setUser(user));
    } catch (error) {
      dispatch(setErrors({ general: error.message || "Login failed!" }));
      console.log(error);
    }
  };
  return (
    <AuthForm>
      {errors?.general && <AuthError>{errors.general}</AuthError>}
      <AuthLabel htmlFor="email">
        Email
        <AuthInput
          name="email"
          id="email"
          placeholder="e.g. bilbob@gmail.com"
          value={form?.email || ""}
          onChange={(e) => handleChange(e.target)}
        />
      </AuthLabel>
      {errors?.email && <AuthError>{errors.email}</AuthError>}
      <AuthLabel htmlFor="password">
        Password
        <AuthInput
          name="password"
          id="password"
          placeholder="password min. 8 characters"
          type="password"
          value={form?.password || ""}
          onChange={(e) => handleChange(e.target)}
        />
      </AuthLabel>
      {errors?.password && <AuthError>{errors.password}</AuthError>}
      <PrimaryButton type="button" onClick={handleLogin}>
        Login
      </PrimaryButton>
    </AuthForm>
  );
};
