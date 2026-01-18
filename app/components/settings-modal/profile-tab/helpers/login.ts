export const login = async ({ email, password }: { email: string; password: string }) => {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email: email, password: password }),
  });
  const data = await res.json();

  if (!data.success) {
    throw new Error(data.message);
  }
  return data.user;
};
