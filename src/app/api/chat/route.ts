import authOptions from "@/lib/auth";
import ChatRepository from "@/repositories/chatRepository";
import { Session, getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

async function createChat(req: NextRequest) {
  const { user } = (await getServerSession(authOptions)) as Session;
  if (!user?.email) return NextResponse.redirect("/");

  const chat = await req.json();
  if (!chat) return NextResponse.json({ error: "Chat content is missing" }, { status: 404 });

  let boardRepository = new ChatRepository(user.email);
  await boardRepository.createChat(chat);

  return NextResponse.json(null, { status: 200 });
}

export { createChat as POST };
