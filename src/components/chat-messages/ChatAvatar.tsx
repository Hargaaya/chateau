import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";

type Props = {
  role: "system" | "assistant" | "user";
};

const ChatAvatar = ({ role }: Props) => {
  const { data: session } = useSession() as { data: Session };
  const image = session?.user?.image ?? undefined;

  return (
    <React.Fragment>
      {role === "user" ? (
        <Avatar>
          <AvatarImage src={image} />
          <AvatarFallback className="bg-pink-400">ME</AvatarFallback>
        </Avatar>
      ) : (
        <Avatar>
          <AvatarImage src="/brain.png" />
          <AvatarFallback className="bg-blue-400">AI</AvatarFallback>
        </Avatar>
      )}
    </React.Fragment>
  );
};

export default ChatAvatar;
