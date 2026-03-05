export const login = async (form: { email: string; password: string }, token: string) => {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      email: form.email,
      password: form.password,
      captchaToken: token,
    }),
  });
  const data = await res.json();

  if (!data.success) {
    throw new Error(data.message);
  }
  return data.user;
};
