"use client";

import PlusIcon from "@/assets/PlusIcon";
import ChatHistory from "@/components/ChatHistory";
import { Button, buttonVariants } from "@/components/ui/button";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";

const Sidebar = () => {
  const router = useRouter();

  const createNewChat = (_: MouseEvent<HTMLButtonElement>) => {
    const id = nanoid();
    router.push(`/chat/${id}`);
  };

  return (
    <div className="fixed top-0 left-0 h-screen lg:flex flex-col max-h-screen border-[0.2px] bg-secondary hidden lg:w-64 p-4 gap-4">
      <ChatHistory />
      <Button onClick={createNewChat} className={buttonVariants({ variant: "secondary" })}>
        <PlusIcon className="mr-2" size="16px" /> Start A New Chat
      </Button>

      <p className="text-sm font-light mt-6 fixed bottom-2">
        Made by <a href="https://github.com/hargaaya">Hargaaya Idris 💫</a>
      </p>
    </div>
  );
};

export default Sidebar;
