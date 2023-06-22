import PlusIcon from "@/assets/PlusIcon";
import ChatHistory from "@/components/ChatHistory";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { nanoid } from "nanoid";
import Link from "next/link";
import { Suspense } from "react";

const Sidebar = () => {
  const id = nanoid();

  return (
    <div className="fixed top-0 left-0 h-screen lg:flex flex-col max-h-screen bg-gray-50 hidden lg:w-64 p-4">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Previous Chats</h2>
        <Suspense fallback={<Skeleton className="w-full h-[50vh] rounded-lg bg-gray-300" />}>
          <ChatHistory />
        </Suspense>
      </div>
      <div className="fixed bottom-0 left-0 w-full lg:w-64 p-4">
        <h2 className="text-2xl font-bold">Start a new chat</h2>
        <p className="text-xl font-light mb-3">Click the button below to start a new chat with Chateau.</p>
        <Link href={`/chat/${id}`} className={buttonVariants()}>
          <PlusIcon className="mr-2" size="16px" /> Start a new chat
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
