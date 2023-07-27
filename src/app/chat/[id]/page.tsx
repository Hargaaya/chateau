"use client";

import Chat from "@/components/Chat";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import fetcher from "@/lib/fetcher";
import { RefreshCcw } from "lucide-react";
import useSWR from "swr";

type Props = {
  params: {
    id: string;
  };
};

export default function Page({ params }: Props) {
  const { id } = params;
  const { data, error, mutate } = useSWR<Chat>(`/api/chat/${id}`, fetcher);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {error && (
        <div className="mx-auto max-w-3xl py-6 flex flex-col gap-4 text-center">
          <p>An error occured getting your history. Try the button below in a while 🐢</p>
          <Button variant="ghost" className="hover:bg-yellow-500" onClick={() => mutate()}>
            <RefreshCcw className="mr-2" size="16px" />
            Refresh
          </Button>
        </div>
      )}
      {!data && (
        <div className="mx-auto w-full max-w-3xl py-6 flex flex-col gap-4">
          <Skeleton className="h-48 rounded-lg bg-secondary" />
          <Skeleton className="h-32 rounded-lg bg-secondary" />
          <Skeleton className="h-24 rounded-lg bg-secondary" />
          <Skeleton className="h-56 rounded-lg bg-secondary" />
          <Skeleton className="h-32 rounded-lg bg-secondary" />
        </div>
      )}
      {data && <Chat chat={data} />}
    </main>
  );
}
