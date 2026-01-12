import { turso } from "../../lib/turso.db";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

interface Rows {
  id?: string;
  hashed_password?: string;
  email?: string;
  fullname?: string;
}
interface JWTPayloadI extends JwtPayload {
  id: string;
  email: string;
}
interface Form {
  fullname?: string;
  email?: string;
  oldPassword?: string;
  newPassword?: string;
}
export async function PATCH(req: NextRequest) {
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
      const form = await req.json();
      const update = await buildUserUpdates(rows[0] as Rows, form);

      if (!update) {
        return Response.json({ success: false, message: "No fields to update" }, { status: 400 });
      }
      const emailChanged = update.sql.includes("email = ?");

      await turso.execute({
        sql: `UPDATE users SET ${update.sql} WHERE id = ?`,
        args: [...update.args, id],
      });

      const { rows: newRows } = await turso.execute({ sql: "SELECT * FROM users WHERE id = ?", args: [id] });
      const { email, fullname } = newRows[0];
      if (emailChanged) {
        const token = jwt.sign({ id, email }, process.env.JWT_SECRET, { expiresIn: "7d" });
        return Response.json(
          { success: true, user: { id, email, fullname } },
          {
            status: 200,
            headers: { "Set-Cookie": `token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=604800` },
          }
        );
      }
      return Response.json({ success: true, user: { id, email, fullname } }, { status: 200 });
    }
    return Response.json({ success: false, message: "No user found" }, { status: 404 });
  } catch (error) {
    return Response.json({ success: false, message: "Something went wrong" }, { status: 500 });
  }
}

export async function buildUserUpdates(user: Rows, form: Form) {
  const updates: string[] = [];
  const args: any[] = [];

  if (typeof form.fullname === "string" && form.fullname.trim() !== "" && form.fullname !== user.fullname) {
    updates.push("fullname = ?");
    args.push(form.fullname);
  }
  if (typeof form.email === "string" && form.email.trim() !== "" && form.email !== user.email) {
    updates.push("email = ?");
    args.push(form.email);
  }
  if (form.oldPassword && form.newPassword) {
    const isMatch = await decodePassword(form.oldPassword, user.hashed_password);
    if (!isMatch) {
      throw new Error("INVALID_OLD_PASSWORD");
    }
    const hashed = await hashPassword(form.newPassword);
    updates.push("hashed_password = ?");
    args.push(hashed);
  }

  if (updates.length === 0) {
    return null;
  }

  return {
    sql: updates.join(", "),
    args,
  };
}

async function decodePassword(pass: string, h_pass: string) {
  const decoded = await bcrypt.compare(pass, h_pass);
  return decoded;
}

async function hashPassword(pass: string) {
  const salt = 10;
  const hashed = await bcrypt.hash(pass, salt);
  return hashed;
}
