import { useEffect, useRef } from "react";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Highlighter from "@/components/Highlighter";
import { Message } from "ai";
import { useSession } from "next-auth/react";
import { type Session } from "next-auth";

type Props = {
  messages: Message[];
};

const ChatContent = ({ messages }: Props) => {
  const chat = useRef<HTMLDivElement>(null);
  const {
    data: { user },
  } = useSession() as { data: Session };
  const imageUrl = user?.image ?? undefined;

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
                <>
                  <AvatarImage src="/brain.png" />
                  <AvatarFallback className="bg-green-400">AI</AvatarFallback>
                </>
              ) : (
                <>
                  <AvatarImage src={imageUrl} />
                  <AvatarFallback className="bg-blue-400">ME</AvatarFallback>
                </>
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
