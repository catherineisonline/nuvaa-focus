type Form = {
  fullname?: string;
  email: string;
  password: string;
  repeatPassword?: string;
  oldPassword?: string;
  newPassword?: string;
};
export const validate = (form: Form, action: string) => {
  const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordReg = /^(?=.*\d)[A-Za-z\d]{8,16}$/;
  const errors = {};

  // EDIT PROFILE
  if (action === "edit") {
    if (form) {
      const { oldPassword = null, newPassword = null, email = null, fullname = null } = form;
      if (email && !emailReg.test(email)) {
        errors["email"] = "Email format seems to be wrong";
      }
      if (fullname && fullname.length <= 1) {
        errors["fullname"] = "Full name is not valid";
      }
      if (newPassword) {
        if (newPassword.trim().length > 0 && oldPassword.trim().length === 0) {
          errors["oldPassword"] = "Include old password to change to a new one";
        } else if (!passwordReg.test(oldPassword)) {
          errors["oldPassword"] = "Password must be 8-16 characters and include at least 1 digit";
        }
        if (!passwordReg.test(newPassword)) {
          errors["newPassword"] = "Password must be 8-16 characters and include at least 1 digit";
        }
      }
    }
  }
  // LOGIN
  else if (action == "login") {
    const { email, password } = form;
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
  } // REGISTER
  else if (action === "register") {
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
