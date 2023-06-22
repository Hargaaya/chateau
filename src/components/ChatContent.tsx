import { useEffect, useRef } from "react";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Highlighter from "@/components/Highlighter";
import { Message } from "ai";

type Props = {
  messages: Message[];
};

const ChatContent = ({ messages }: Props) => {
  const chat = useRef<HTMLDivElement>(null);
  useEffect(() => {
    chat.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div>
      {messages.map((message: Message, index: number) => (
        <>
          <div key={index} ref={index === messages.length - 1 ? chat : null} className="flex gap-4 w-full py-4">
            <Avatar>
              {message.role === "assistant" ? (
                <AvatarFallback className="bg-green-400">AI</AvatarFallback>
              ) : (
                <AvatarFallback className="bg-blue-400">ME</AvatarFallback>
              )}
            </Avatar>
            <div className="font-light pt-2 whitespace-pre-wrap">
              <Highlighter text={message.content} />
            </div>
          </div>
          {index !== messages.length - 1 && <Separator className="w-11/12 mx-auto" orientation="horizontal" />}
        </>
      ))}
    </div>
  );
};

export default ChatContent;
