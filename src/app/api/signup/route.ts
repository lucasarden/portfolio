import { hash } from "bcrypt";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password || !name) {
      return new Response("Missing fields", { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return new Response("Email already in use", { status: 400 });
    }

    const hashedPassword = await hash(password, 10);

    await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    return new Response("Account created", { status: 201 });
  } catch (err) {
    console.error(err);
    return new Response("Internal Server Error", { status: 500 });
  }
}