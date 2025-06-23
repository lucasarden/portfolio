import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  context: { params: { projectId: string } }
) {
  const { projectId } = await context.params;
  const comments = await prisma.comment.findMany({
    where: { projectId },
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });
  return NextResponse.json(comments);
}

export async function POST(
  req: Request,
  context: { params: { projectId: string } }
) {
  const { projectId } = await context.params;
  const session = await getServerSession(authOptions);

  if (!session?.user?.id || !session?.user?.name) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { message } = await req.json();
  const newComment = await prisma.comment.create({
    data: {
      message,
      projectId,
      userId: session.user.id,
    },
  });
  return NextResponse.json(newComment, { status: 201 });
}
