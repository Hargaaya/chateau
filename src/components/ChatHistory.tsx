"use client";

import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

type ChatHistory = {
  _id: string;
  text: string;
};

const ChatHistory = () => {
  const [history, setHistory] = useState<ChatHistory[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const response = await fetch("/api/chat/history");
      const data = await response.json();
      if (data) setHistory(data);
    };

    fetchHistory();
  }, []);

  return (
    <div className="flex flex-col gap-4 w-full">
      {history.map((item: ChatHistory, index) => (
        <Link key={item.text + index} href={`/chat/${item._id}`} className={buttonVariants()}>
          <p className="capitalize truncate">{item.text}</p>
        </Link>
      ))}
    </div>
  );
};

export default ChatHistory;
