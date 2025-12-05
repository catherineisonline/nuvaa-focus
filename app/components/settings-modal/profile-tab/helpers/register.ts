type Form = {
  fullname: string;
  email: string;
  password: string;
  repeatPassword: string;
};
export const register = async (form: Form) => {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });
  const data = await res.json();
  if (!data.success) {
    throw new Error(data);
  }
  return true;
};
