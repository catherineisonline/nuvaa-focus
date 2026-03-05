type Form = {
  fullname: string;
  email: string;
  password: string;
  repeatPassword: string;
};
export const register = async (form: Form, captchaToken: string) => {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ form, captchaToken }),
  });
  const data = await res.json();
  if (!data.success) {
    throw new Error(data.message);
  }
  return true;
};
