import authOptions from "@/lib/auth";
import BoardRepository from "@/repositories/boardRepository";
import { Session, getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

async function getBoards() {
  const { user } = (await getServerSession(authOptions)) as Session;
  if (!user?.email) return NextResponse.redirect("/");

  let boardRepository = new BoardRepository(user.email);
  let data = await boardRepository.getBoards();

  return NextResponse.json(data);
}

async function createBoard(req: NextRequest) {
  const { user } = (await getServerSession(authOptions)) as Session;
  if (!user?.email) return NextResponse.redirect("/");

  const { board } = await req.json();
  if (!board) return NextResponse.json({ error: "Board is missing" }, { status: 404 });

  let boardRepository = new BoardRepository(user.email);
  const data = await boardRepository.createBoard(board);

  return NextResponse.json(data);
}

async function updateBoard(req: NextRequest) {
  const { user } = (await getServerSession(authOptions)) as Session;
  if (!user?.email) return NextResponse.redirect("/");

  const { board } = await req.json();
  if (!board) return NextResponse.json({ error: "Board is missing" }, { status: 404 });

  let boardRepository = new BoardRepository(user.email);
  await boardRepository.updateBoard(board);

  return NextResponse.json(null, { status: 200 });
}

async function deleteBoard(req: NextRequest) {
  const { user } = (await getServerSession(authOptions)) as Session;
  if (!user?.email) return NextResponse.redirect("/");

  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "Id is missing" }, { status: 400 });

  let boardRepository = new BoardRepository(user.email);
  await boardRepository.deleteBoard(id);

  return new NextResponse(null, { status: 204 });
}

export { getBoards as GET, createBoard as POST, updateBoard as PUT, deleteBoard as DELETE };
