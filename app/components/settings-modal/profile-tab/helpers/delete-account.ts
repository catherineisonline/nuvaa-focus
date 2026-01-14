export const deleteAccount = async () => {
  const res = await fetch("/api/user", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const data = await res.json();

  if (!data.success) {
    throw new Error(data.message);
  }
  return true;
};
