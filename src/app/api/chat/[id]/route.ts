import authOptions from "@/lib/auth";
import mongoConnection from "@/lib/mongoConnection";
import ChatRepository from "@/repositories/chatRepository";
import { Session, getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(_: Request, context: any) {
  const { user } = (await getServerSession(authOptions)) as Session;
  if (!user?.email) return NextResponse.redirect("/");

  const { id } = context.params;
  if (!id) return NextResponse.json({ error: "missing id" }, { status: 400 });

  await mongoConnection();
  const chatRepository = new ChatRepository(user?.email);
  const messages = await chatRepository.getChatMessages(id);
  if (!messages) return NextResponse.json({ error: "could not find messages" }, { status: 200 });

  return NextResponse.json(messages);
}
