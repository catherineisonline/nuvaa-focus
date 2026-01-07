import { useEffect, useState } from "react";

export function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUser() {
      try {
        const res = await fetch("api/user/me", {
          credentials: "include",
        });
        const data = await res.json();
        if (!data.success) {
          throw new Error(data);
        }
        setUser(data.user);
      } catch (error) {
        setUser(null);
      }
    }
    getUser();
  }, []);
  return user;
}
