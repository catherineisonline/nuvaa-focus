export const edit = async (form) => {
  const res = await fetch("/api/user/update", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(form),
  });
  const data = await res.json();

  if (!data.success) {
    throw new Error(data.message);
  }
  return data.user;
};
