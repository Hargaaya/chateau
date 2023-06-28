import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
import ChatCompletion from "@/models/ChatCompletion";
import mongoConnection from "@/lib/mongoConnection";

export async function POST(req: Request) {
  const { messages, id, engine, apiKey } = await req.json();

  if (!id) return new Response(JSON.stringify({ error: "No id provided" }), { status: 400 });

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY ?? apiKey,
  });

  const openai = new OpenAIApi(configuration);

  const response = await openai.createChatCompletion({
    model: engine ?? "gpt-3.5-turbo",
    stream: true,
    messages,
  });

  await mongoConnection();

  const stream = OpenAIStream(response, {
    async onCompletion(completion: string) {
      const convoExists = await ChatCompletion.exists({ _id: id });

      messages.push({
        content: completion,
        role: "assistant",
      });

      if (convoExists) {
        await ChatCompletion.updateOne({ _id: id }, { messages });
      } else {
        await ChatCompletion.create({
          _id: id,
          text: messages[0].content,
          messages,
        });
      }
    },
  });

  return new StreamingTextResponse(stream);
}
