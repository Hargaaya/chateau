"use client";

import Chat from "@/components/Chat";
import { type Message } from "ai";
import { useEffect, useState } from "react";

type Props = {
  params: {
    id: string;
  };
};

export default function Page({ params }: Props) {
  const { id } = params;
  const [initialMessages, setInitialMessages] = useState<Message[]>([]);

  useEffect(() => {
    const getConvo = async () => {
      const res = await fetch(`/api/chat/${id}`);
      const data = (await res.json()) as ChatCompletion;
      if (data) setInitialMessages(data.messages);
    };

    getConvo();
  }, [id]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Chat id={id} initialMessages={initialMessages} />
    </main>
  );
}
