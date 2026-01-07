import { turso } from "../../lib/turso.db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

interface Rows {
  id?: string;
  hashed_password?: string;
  email?: string;
  fullname?: string;
}
export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  try {
    const { rows } = await turso.execute({ sql: "SELECT * FROM users WHERE email = ?", args: [email] });
    if (rows?.length > 0) {
      const { hashed_password } = rows[0] as Rows;
      const match = await decodePassword(password, hashed_password);
      if (match) {
        const { id, email, fullname } = rows[0];
        const token = jwt.sign({ id, email }, process.env.JWT_SECRET, { expiresIn: "7d" });
        return Response.json(
          { success: true, user: { id, email, fullname } },
          {
            status: 200,
            headers: { "Set-Cookie": `token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=604800` },
          }
        );
      }
      return Response.json({ success: false, message: "Password doesn't match the user" }, { status: 404 });
    } else {
      return Response.json({ success: false, message: "User with such email doesn't exist" }, { status: 404 });
    }
  } catch (error) {
    return Response.json(error);
  }
}

async function decodePassword(pass: string, h_pass: string) {
  const decoded = await bcrypt.compare(pass, h_pass);
  return decoded;
}
