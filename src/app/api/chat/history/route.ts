import { Session, getServerSession } from "next-auth";
import { NextResponse } from "next/server";
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
