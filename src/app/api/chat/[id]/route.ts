import mongoConnection from "@/lib/mongoConnection";
import ChatCompletion from "@/models/ChatCompletion";
import { NextResponse } from "next/server";

export async function GET(_: Request, context: any) {
  const { id } = context.params;

  await mongoConnection();

  const convoExists = await ChatCompletion.exists({ id });
  if (!convoExists) return NextResponse.json({ error: "No conversation found" }, { status: 404 });

  const completion = await ChatCompletion.findById(id);
  return NextResponse.json(completion);
}
