import mongoConnection from "@/lib/mongoConnection";
import ChatCompletion from "@/models/ChatCompletion";
import { NextResponse } from "next/server";

export async function GET(_: Request) {
  await mongoConnection();
  const data = await ChatCompletion.find({}, "-messages -__v");

  return NextResponse.json(data);
}
