import { Resend } from "resend";
import { EmailTemplate } from "@/app/components/EmailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(
  email: string,
  token: string,
  name: string
) {
  const verifyUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/verification?token=${token}`;
  await resend.emails.send({
    from: "noreply@verification.lucasarden.com",
    to: email,
    subject: "Verify your email",
    react: EmailTemplate({ name, verifyUrl }),
  });
}
