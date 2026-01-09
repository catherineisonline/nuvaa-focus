export const logout = async () => {
  const res = await fetch("/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });
  const data = await res.json();
  if (!data.success) {
    throw new Error(data.message);
  }
  return data.success;
};
