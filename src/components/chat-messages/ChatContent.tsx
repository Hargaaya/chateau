import React, { useEffect, useRef } from "react";
import { Separator } from "@/components/ui/separator";
import Highlighter from "./Highlighter";
import { Message } from "ai";
import ChatAvatar from "./ChatAvatar";
import isLastInArray from "@/utils/isLastInArray";

type Props = {
  messages: Message[];
};

const ChatContent = ({ messages }: Props) => {
  const lastChatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    lastChatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <React.Fragment>
      {messages.map((message: Message, index: number) => {
        const isLast = isLastInArray(messages, index);
        const { role, content } = message;

        return (
          <React.Fragment key={index}>
            <div ref={isLast ? lastChatRef : null} className="flex gap-4 w-full py-4">
              <ChatAvatar role={role} />
              <Highlighter message={content} />
            </div>
            {!isLast && <Separator className="w-11/12 mx-auto" orientation="horizontal" />}
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
};

export default ChatContent;
