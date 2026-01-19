import { useDispatch, useSelector } from "react-redux";
import { ActionButton, AuthForm, AuthInput, InputError, InputLabel } from "../../Profile.styled";
import { RootState } from "../../../../../redux/store";
import { setErrors, setForm } from "../../../../../redux/slices/registerSlice";
import { validate } from "../../helpers/validate";
import { register } from "../../helpers/register";
import { setActiveTab } from "../../../../../redux/slices/loginSlice";
import { registerSelectors } from "../../../../../redux/selectors/registerSelectors";

export const Register = () => {
  const dispatch = useDispatch();
  const { form, errors } = useSelector(registerSelectors);
  const handleChange = (e: HTMLInputElement) => {
    const { name, value } = e;
    dispatch(setForm({ key: name, value: value }));
  };
  const handleRegister = async () => {
    const validation = validate(form, "register");
    if (Object.keys(validation).length > 0) {
      dispatch(setErrors(validation));
      return;
    }
    try {
      const res = await register(form);

      if (res) {
        dispatch(setErrors(null));
        dispatch(setForm("reset"));
        dispatch(setActiveTab("login"));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AuthForm>
      <InputLabel htmlFor="fullname">
        Full Name
        <AuthInput
          name="fullname"
          id="fullname"
          placeholder="e.g. Bilbo Baggins"
          value={form?.fullname}
          onChange={(e) => handleChange(e.target)}
        />
      </InputLabel>
      {errors?.fullname && <InputError>{errors.fullname}</InputError>}
      <InputLabel htmlFor="email">
        Email
        <AuthInput
          name="email"
          id="email"
          placeholder="e.g. bilbob@gmail.com"
          value={form?.email}
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
          value={form?.password}
          onChange={(e) => handleChange(e.target)}
        />
      </InputLabel>
      {errors?.password && <InputError>{errors.password}</InputError>}
      <InputLabel htmlFor="repeatPassword">
        Repeat password
        <AuthInput
          name="repeatPassword"
          id="repeatPassword"
          placeholder="the same password as above"
          type="password"
          value={form?.repeatPassword}
          onChange={(e) => handleChange(e.target)}
        />
      </InputLabel>
      {errors?.repeatPassword && <InputError>{errors.repeatPassword}</InputError>}
      <ActionButton type="button" onClick={handleRegister}>
        Register
      </ActionButton>
    </AuthForm>
  );
};
