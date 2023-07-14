import mongoConnection from "@/lib/mongoConnection";
import ChatCompletion from "@/models/ChatCompletion";
import { NextApiRequest } from "next";
import { Session, getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import authOptions from "@/lib/auth";

export async function GET(req: Request, res: Response) {
  const session = await getServerSession(authOptions);
  const { user } = session as Session;
  await mongoConnection();
  console.log(user?.email);
  const data = await ChatCompletion.find({ email: user?.email }, "-messages -__v");

  return NextResponse.json(data);
}
