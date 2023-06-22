import { type Message, useChat } from "ai/react";
import InputField from "@/components/InputField";
import ChatContent from "./ChatContent";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useSelector } from "react-redux";
import { getSettings } from "@/stores/slices/settingsSlice";

type Props = {
  id?: string;
  initialMessages?: Message[];
};

const Chat = ({ id, initialMessages }: Props) => {
  const engine = useSelector(getSettings).engine;

  const { messages, input, isLoading, handleInputChange, handleSubmit } = useChat({
    initialMessages,
    api: "/api/chat",
    body: {
      id: id,
      engine: engine,
    },
  });

  return (
    <div className="mx-auto w-full max-w-3xl py-4 flex flex-col">
      <div className="mb-24">
        <Suspense fallback={<Skeleton className="w-full h-[50vh] rounded-lg" />}>
          <ChatContent messages={messages} />
        </Suspense>
      </div>
      <InputField handleSubmit={handleSubmit} handleInputChange={handleInputChange} input={input} isLoading={isLoading} />
    </div>
  );
};

export default Chat;
