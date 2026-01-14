import { turso } from "../lib/turso.db";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

interface JWTPayloadI extends JwtPayload {
  id: string;
  email: string;
}

export async function DELETE() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    return Response.json({ success: false, message: "User not authorized" }, { status: 401 });
  }

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET) as JWTPayloadI;
    if (!id) {
      return Response.json({ success: false, message: "User not authorized" }, { status: 401 });
    }
    const { rows } = await turso.execute({ sql: "SELECT * FROM users WHERE id = ?", args: [id] });
    if (rows?.length > 0) {
      await turso.execute({
        sql: "DELETE FROM users WHERE id = ?",
        args: [id],
      });
      cookieStore.delete("token");

      return Response.json({ success: true }, { status: 200 });
    }
    return Response.json({ success: false, message: "No user found" }, { status: 404 });
  } catch (error) {
    return Response.json({ success: false, message: "Something went wrong" }, { status: 500 });
  }
}
