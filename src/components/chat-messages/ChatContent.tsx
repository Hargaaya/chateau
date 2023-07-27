import React, { useEffect, useRef } from "react";
import { Separator } from "@/components/ui/separator";
import Highlighter from "./Highlighter";
import { Message } from "ai";
import ChatAvatar from "./ChatAvatar";
import isLastInArray from "@/utils/isLastInArray";
import { nanoid } from "nanoid";
import { mutate } from "swr";

type Props = {
  messages: Message[];
  title: string;
};

const ChatContent = ({ messages, title }: Props) => {
  const lastChatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    lastChatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function forkChat(index: number) {
    const _id = nanoid();
    const scopedMessages = messages.slice(0, index + 1);

    await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id,
        title: `fork of: ${title}`,
        messages: scopedMessages,
      }),
    }).then((res) => {
      if (res.ok) {
        mutate("/api/chat/history");
      }
    });
  }

  return (
    <React.Fragment>
      {messages.map((message: Message, index: number) => {
        const isLast = isLastInArray(messages, index);
        const { role, content } = message;

        return (
          <React.Fragment key={index}>
            <div ref={isLast ? lastChatRef : null} className="flex gap-4 w-full py-4">
              <ChatAvatar role={role} />
              <Highlighter index={index} message={content} forkChat={forkChat} />
            </div>
            {!isLast && <Separator className="w-11/12 mx-auto" orientation="horizontal" />}
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
};

export default ChatContent;
