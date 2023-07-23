import { Session, getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "@/lib/auth";
import ChatRepository from "@/repositories/chatRepository";

export async function GET() {
  const { user } = (await getServerSession(authOptions)) as Session;
  if (!user?.email) return NextResponse.redirect("/");

  const chatRepository = new ChatRepository(user?.email);
  const history = await chatRepository.getChatHistory();
  if (!history) return NextResponse.json({ error: "could not find history" }, { status: 400 });

  return NextResponse.json(history);
}

export async function PUT(req: NextRequest) {
  const { user } = (await getServerSession(authOptions)) as Session;
  if (!user?.email) return NextResponse.redirect("/");

  const { chat } = await req.json();
  if (!chat) return NextResponse.json({ error: "no chat received" }, { status: 404 });

  const chatRepository = new ChatRepository(user?.email);
  await chatRepository.updateChatTitle(chat.id, chat.title);

  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  const { user } = (await getServerSession(authOptions)) as Session;
  if (!user?.email) return NextResponse.redirect("/");

  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "missing id" }, { status: 400 });

  const chatRepository = new ChatRepository(user?.email);
  await chatRepository.deleteChat(id);

  return NextResponse.json({ success: true });
}
