import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(email: string, token: string) {
  const verifyUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/verify-email?token=${token}`;
  await resend.emails.send({
    from: "noreply@verification.lucasarden.com",
    to: email,
    subject: "Verify your email",
    html: `<p>Click <a href="${verifyUrl}">here</a> to verify your email address.</p>`,
  });
}
