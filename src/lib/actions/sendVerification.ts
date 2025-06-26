import prisma from "@/lib/prisma";
import { sendVerificationEmail } from "@/lib/email";
import crypto from "crypto";

export async function generateAndSendVerification(email: string, name: string) {
  const token = crypto.randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 60 * 60 * 1000);

  await prisma.verificationToken.create({
    data: {
      identifier: email,
      token,
      expires,
    },
  });

  await sendVerificationEmail(email, token, name);
}
