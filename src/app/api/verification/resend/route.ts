import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { generateAndSendVerification } from "@/lib/actions/sendVerification";

export async function POST(req: Request) {
  const { email } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || user.emailVerified) {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }

  await prisma.verificationToken.deleteMany({ where: { identifier: email } });

  await generateAndSendVerification(email, user.name || "User");

  return NextResponse.json({ message: "Verification email resent" });
}
