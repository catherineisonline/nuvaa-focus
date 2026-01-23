import { turso } from "../../lib/turso.db";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { NextRequest } from "next/server";
interface User {
  id: string;
  email: string;
  fullname: string;
  hashed_password: string;
}
export async function POST(req: NextRequest) {
  const { email, fullname, password } = await req.json();
  const uniqueId = uuidv4();
  const hashed = await hashPassword(password);

  const user: User = {
    id: uniqueId,
    email: email,
    fullname: fullname,
    hashed_password: hashed,
  };
  try {
    await turso.execute({
      sql: "INSERT INTO users (id, email, fullname, hashed_password) VALUES (?, ?, ?, ?);",
      args: [user.id, user.email, user.fullname, user.hashed_password],
    });
    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    if (error.name === "LibsqlError") {
      if (error.code === "SQLITE_CONSTRAINT") {
        return Response.json({ success: false, message: "User with such email already exists" }, { status: 409 });
      } else return Response.json({ success: false }, { status: 500 });
    }
    return Response.json({ success: false }, { status: 500 });
  }
}

async function hashPassword(pass: string) {
  const salt = 10;
  const hashed = await bcrypt.hash(pass, salt);
  return hashed;
}
