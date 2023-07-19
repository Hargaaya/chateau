"use client";

import PlusIcon from "@/assets/PlusIcon";
import ChatHistory from "@/components/ChatHistory";
import { Button, buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { nanoid } from "nanoid";
import { Session } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { MouseEvent, Suspense } from "react";

const Sidebar = () => {
  const router = useRouter();
  const {
    data: { user },
  } = useSession() as { data: Session };
  const name = user?.name || "User";
  const image = user?.image || "/brain.png";

  const createNewChat = (_: MouseEvent<HTMLButtonElement>) => {
    const id = nanoid();
    router.push(`/chat/${id}`);
  };

  return (
    <div className="fixed top-0 left-0 h-screen lg:flex flex-col max-h-screen border-[0.2px] bg-secondary hidden lg:w-64 p-4">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Previous Chats</h2>
        <Suspense fallback={<Skeleton className="w-full h-[50vh] rounded-lg bg-gray-300" />}>
          <ChatHistory />
        </Suspense>
      </div>
      <div className="fixed bottom-0 left-0 w-full lg:w-64 p-4">
        <Button className="max-w-full mb-4" onClick={() => signOut()}>
          <img className="rounded-full h-6 w-6 mr-2" src={image} alt={name} />
          <p className="truncate">Sign Out {name}</p>
        </Button>
        <h2 className="text-2xl font-bold">Start a new chat</h2>
        <p className="text-xl font-light mb-3">Click the button below to start a new chat with Chateau.</p>
        <Button onClick={createNewChat} className={buttonVariants()}>
          <PlusIcon className="mr-2" size="16px" /> Start a new chat
        </Button>
        <p className="text-sm font-light mt-6">
          Made by <a href="https://github.com/hargaaya">Hargaaya Idris 💫</a>
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
