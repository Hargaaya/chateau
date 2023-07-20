"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import fetcher from "@/lib/fetcher";
import useSWR from "swr";
import { Skeleton } from "@/components/ui/skeleton";
import { RefreshCcw } from "lucide-react";

const ChatHistory = () => {
  const { data: history, error, mutate } = useSWR<ChatHistory[]>("/api/chat/history", fetcher);

  return (
    <>
      {error && (
        <>
          <p>An error occured getting your history. Try the button below in a while 🐢</p>
          <Button variant="ghost" className="hover:bg-yellow-500" onClick={() => mutate}>
            <RefreshCcw className="mr-2" size="16px" />
            Refresh
          </Button>
        </>
      )}
      {!history && (
        <div className="flex flex-col gap-4 w-full">
          <Skeleton className="w-full h-10 dark:bg-primary" />
          <Skeleton className="w-full h-10 dark:bg-primary" />
          <Skeleton className="w-full h-10 dark:bg-primary" />
        </div>
      )}

      {history && (
        <div className="flex flex-col gap-4 w-full">
          {history.map((item: ChatHistory) => (
            <Link key={item.title} href={`/chat/${item._id}`} className={buttonVariants()}>
              <p className="capitalize truncate">{item.title}</p>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default ChatHistory;
