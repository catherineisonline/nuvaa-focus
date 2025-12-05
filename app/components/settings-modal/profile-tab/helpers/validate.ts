type Form = {
  fullname?: string;
  email: string;
  password: string;
  repeatPassword?: string;
};
export const validate = (form: Form, action: string) => {
  const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordReg = /^(?=.*\d)[A-Za-z\d]{8,16}$/;
  const errors = {};
  const { email, fullname, password, repeatPassword } = form;

  if (email.length === 0) {
    errors["email"] = "Email can't be empty";
  } else if (!emailReg.test(email)) {
    errors["email"] = "Email format seems to be wrong";
  }

  if (password.length === 0) {
    errors["password"] = "Password can't be empty";
  } else if (!passwordReg.test(password)) {
    errors["password"] = "Password must be 8-16 characters and include at least 1 digit";
  }
  if (action === "register") {
    if (fullname.length <= 1) {
      errors["fullname"] = "Full name is not valid";
    }
    if (repeatPassword.length === 0) {
      errors["repeatPassword"] = "Repeat the password";
    } else if (!passwordReg.test(repeatPassword)) {
      errors["repeatPassword"] = "Password must be 8-16 characters and include at least 1 digit";
    }
    if (password !== repeatPassword) {
      errors["repeatPassword"] = "Passwords don't match";
    }
  }

  return errors;
};
