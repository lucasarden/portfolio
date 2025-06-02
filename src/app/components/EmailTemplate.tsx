import React from "react";
import {
  Html,
  Link,
  Body,
  Head,
  Heading,
  Container,
  Tailwind,
  Text,
} from "@react-email/components";

interface EmailTemplateProps {
  name: string;
  verifyUrl?: string;
}

export const EmailTemplate = ({ name, verifyUrl }: EmailTemplateProps) => (
  <Html>
    <Head></Head>
    <Tailwind>
      <Body className={`bg-[#fafaf9]`}>
        <Container className="bg-[#fafaf9] h-[20px]"></Container>
        <Container className="flex-col justify-center py-8 px-[25px] w-[450px] space-y-4 my-8 h-[300px] flex items-center bg-white rounded-xl shadow ">
          <Heading className="text-center">Welcome, {name}!</Heading>
          <Text className="mx-auto text-lg text-gray-700 text-center">
            Thank you for joining us. We're excited to have you on board!
          </Text>
          <Text className="mx-auto text-lg text-gray-700 text-center">
            Please verify your email by clicking the link below:
          </Text>
          <div style={{ textAlign: "center" }}>
            <Link
              href={verifyUrl}
              className="px-4 py-2 rounded-full font-semibold bg-blue-950 text-white"
            >
              Verify Email
            </Link>
          </div>
        </Container>
        <Container className="bg-[#fafaf9] h-[20px]"></Container>
      </Body>
    </Tailwind>
  </Html>
);
