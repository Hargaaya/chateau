import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
import ChatCompletion from "@/models/ChatCompletion";
import mongoConnection from "@/lib/mongoConnection";
import { Session, getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import { User } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import ChatRepository from "@/repositories/chatRepository";

// TODO: Clean up this file, too much to read, split up.
export async function POST(req: NextRequest) {
  const { user } = (await getServerSession(authOptions)) as Session;
  if (!user?.email) return NextResponse.redirect("/");

  const { messages, id, model, apiKey } = await req.json();
  if (!id) return new NextResponse(JSON.stringify({ error: "No id provided" }), { status: 400 });

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY ?? apiKey,
  });

  const openai = new OpenAIApi(configuration);

  const response = await openai.createChatCompletion({
    model: model ?? "gpt-3.5-turbo",
    stream: true,
    messages,
  });

  await mongoConnection();

  const stream = OpenAIStream(response, {
    async onCompletion(completion: string) {
      const chatExists = await User.exists({ _id: user.email, "chats._id": id });
      const chatRepository = new ChatRepository(user?.email as string);
      messages.push({ content: completion, role: "assistant" });

      if (chatExists) {
        await chatRepository.updateChatMessages(id, messages);
      } else {
        await chatRepository.createChat({
          _id: id as string,
          title: messages[0].content,
          messages,
        });
      }
    },
  });

  return new StreamingTextResponse(stream);
}
