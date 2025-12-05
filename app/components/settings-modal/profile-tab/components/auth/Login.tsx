import { useDispatch, useSelector } from "react-redux";
import { AddTaskButton, TaskInput } from "../../Profile.styled";
import { RootState } from "../../../../../redux/store";
import { validate } from "../../helpers/validate";
import { login } from "../../helpers/login";
import { setErrors, setForm } from "../../../../../redux/slices/loginSlice";
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
      dispatch(setUser(user));
      dispatch(setErrors(null));
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <form>
      <label htmlFor="email">
        Email
        <TaskInput
          name="email"
          id="email"
          placeholder="e.g. bilbob@gmail.com"
          value={form?.email || ""}
          onChange={(e) => handleChange(e.target)}
        />
      </label>
      {errors?.email && <span>{errors.email}</span>}
      <label htmlFor="password">
        Password
        <TaskInput
          name="password"
          id="password"
          placeholder="password min. 8 characters"
          type="password"
          value={form?.password || ""}
          onChange={(e) => handleChange(e.target)}
        />
      </label>
      {errors?.password && <span>{errors.password}</span>}
      <AddTaskButton type="button" onClick={handleLogin}>
        Login
      </AddTaskButton>
    </form>
  );
};
