import { useDispatch, useSelector } from "react-redux";
import { AddTaskButton, TaskInput } from "../../Profile.styled";
import { RootState } from "../../../../../redux/store";
import { setErrors, setForm } from "../../../../../redux/slices/registerSlice";
import { validate } from "../../helpers/validate";
import { register } from "../../helpers/register";

export const Register = () => {
  const dispatch = useDispatch();
  const form = useSelector((state: RootState) => state.register.form);
  const errors = useSelector((state: RootState) => state.register.errors);
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
        // setActiveTab("login");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <form>
      <label htmlFor="fullname">
        Full Name
        <TaskInput
          name="fullname"
          id="fullname"
          placeholder="e.g. Bilbo Baggins"
          value={form?.fullname}
          onChange={(e) => handleChange(e.target)}
        />
      </label>
      {errors?.fullname && <span>{errors.fullname}</span>}
      <label htmlFor="email">
        Email
        <TaskInput
          name="email"
          id="email"
          placeholder="e.g. bilbob@gmail.com"
          value={form?.email}
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
          value={form?.password}
          onChange={(e) => handleChange(e.target)}
        />
      </label>
      {errors?.password && <span>{errors.password}</span>}
      <label htmlFor="repeatPassword">
        Repeat password
        <TaskInput
          name="repeatPassword"
          id="repeatPassword"
          placeholder="the same password as above"
          type="password"
          value={form?.repeatPassword}
          onChange={(e) => handleChange(e.target)}
        />
      </label>
      {errors?.repeatPassword && <span>{errors.repeatPassword}</span>}
      <AddTaskButton type="button" onClick={handleRegister}>
        Register
      </AddTaskButton>
    </form>
  );
};
