"use client";

import { useEffect, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

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

  const hasHistory = history.length > 0;
  if (!hasHistory) return <p>No chat history</p>;
  return (
    <div className="flex flex-col gap-4 w-full">
      {history.map((item: ChatHistory, index) => (
        <Link key={item.title + index} href={`/chat/${item._id}`} className={buttonVariants()}>
          <p className="capitalize truncate">{item.title}</p>
        </Link>
      ))}
    </div>
  );
};

export default ChatHistory;
