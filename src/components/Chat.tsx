import { type Message, useChat } from "ai/react";
import InputField from "@/components/InputField";
import ChatContent from "./chat-messages/ChatContent";
import { useSelector } from "react-redux";
import { getLocalSettings } from "@/stores/slices/settingsSlice";
import { useSWRConfig } from "swr";

type Props = {
  id?: string;
  initialMessages?: Message[];
};

const Chat = ({ id, initialMessages }: Props) => {
  const model = useSelector(getLocalSettings).model;
  const apiKey = useSelector(getLocalSettings).apiKey;
  const { mutate } = useSWRConfig();

  const { messages, input, isLoading, handleInputChange, handleSubmit, stop, reload } = useChat({
    initialMessages,
    id,
    api: "/api/chat/talk",
    body: {
      id: id,
      model: model,
      apiKey: apiKey,
    },
    onFinish: () => {
      if (initialMessages) return;
      mutate("/api/chat/history");
    },
  });

  return (
    <div className="mx-auto w-full max-w-3xl py-4 flex flex-col">
      <div className="mb-56">
        <ChatContent messages={messages} />
      </div>
      <InputField
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        stop={stop}
        reload={reload}
        input={input}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Chat;
