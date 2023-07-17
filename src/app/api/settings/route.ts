import authOptions from "@/lib/auth";
import { User } from "@/models/User";
import { Session, getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { user } = (await getServerSession(authOptions)) as Session;
  if (!user?.email) return NextResponse.redirect("/");

  const { settings } = await req.json();
  if (!settings) return NextResponse.json({ error: "no settings received" }, { status: 404 });

  await User.findByIdAndUpdate(user.email, { settings: settings });

  return new NextResponse(null, { status: 200 });
}

export async function GET(req: NextRequest) {
  const { user } = (await getServerSession(authOptions)) as Session;
  if (!user?.email) return NextResponse.redirect("/");

  const res = await User.findById(user.email, "settings");

  return NextResponse.json({ data: res.settings });
}
