import { hash } from "bcrypt";
import prisma from "@/lib/prisma";
import { generateAndSendVerification } from "@/lib/actions/sendVerification";

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
        image: `https://api.dicebear.com/7.x/thumbs/svg?seed=${encodeURIComponent(name)}`,
      },
    });

    await generateAndSendVerification(email, name);

    return new Response("Account created. Please check your email to verify.", {
      status: 201,
    });
  } catch (err) {
    console.error(err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
