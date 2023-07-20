"use client";

import Chat from "@/components/Chat";
import { Skeleton } from "@/components/ui/skeleton";
import fetcher from "@/lib/fetcher";
import useSWR from "swr";

type Props = {
  params: {
    id: string;
  };
};

export default function Page({ params }: Props) {
  const { id } = params;
  const { data, error } = useSWR<Chat>(`/api/chat/${id}`, fetcher);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {error && <p>An error occured getting your history. Try the button below in a while 🐢</p>}
      {!data && (
        <Skeleton className="max-w-3xl w-full h-[90vh] m-10 rounded-lg bg-secondary flex items-center justify-center">Loading...</Skeleton>
      )}
      {data && <Chat id={id} initialMessages={data.messages} />}
    </main>
  );
}
