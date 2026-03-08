import { useDispatch, useSelector } from "react-redux";
import { PrimaryButton, AuthForm, AuthInput, AuthError, AuthLabel } from "../../Profile.styled";
import { validate } from "../../helpers/validate";
import { login } from "../../helpers/login";
import { resetLoginForm, setErrors, setForm } from "../../../../../redux/slices/loginSlice";
import { setUser } from "../../../../../redux/slices/profileSlice";
import { loginSelectors } from "../../../../../redux/selectors/loginSelectors";

import { useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { LoginSkeleton } from "./LoginSkeleton";

export const Login = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const { form, errors } = useSelector(loginSelectors);
  const handleChange = (e: HTMLInputElement) => {
    const { name, value } = e;
    dispatch(setForm({ key: name, value: value }));
  };
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const validation = validate(form, "login");
    if (Object.keys(validation).length > 0) {
      dispatch(setErrors(validation));
      setIsLoading(false);
      return;
    }

    if (!captchaToken) {
      dispatch(setErrors({ general: "Please verify you are human." }));
      setIsLoading(false);
      return;
    }
    try {
      const user = await login(form, captchaToken);
      dispatch(setErrors(null));
      dispatch(resetLoginForm());
      dispatch(setUser(user));
    } catch (error) {
      dispatch(setErrors({ general: error.message || "Login failed!" }));
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) return <LoginSkeleton />;
  return (
    <AuthForm onSubmit={handleLogin}>
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
      <PrimaryButton type="submit">Login</PrimaryButton>
      <Turnstile
        options={{
          theme: "light",
        }}
        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
        onSuccess={(token: string) => setCaptchaToken(token)}
      />
    </AuthForm>
  );
};
