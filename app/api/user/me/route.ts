import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { turso } from "../../lib/turso.db";

interface JWTPayloadI extends JwtPayload {
  id: string;
  email: string;
}

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    return Response.json({ success: false });
  }
  const { email } = jwt.verify(token, process.env.JWT_SECRET) as JWTPayloadI;
  try {
    const { rows } = await turso.execute({ sql: "SELECT * FROM users WHERE email = ?", args: [email] });
    if (rows?.length > 0) {
      const { id, email, fullname } = rows[0];
      return Response.json({ success: true, user: { id, email, fullname } }, { status: 200 });
    }
    return Response.json({ success: false, message: "Error verifying session" }, { status: 404 });
  } catch (error) {
    return Response.json(error);
  }
}
