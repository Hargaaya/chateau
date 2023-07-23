"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import fetcher from "@/lib/fetcher";
import useSWR from "swr";
import { Skeleton } from "@/components/ui/skeleton";
import { MessageSquareIcon, PenLine, RefreshCcw, Trash2Icon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { ChangeEvent, MouseEvent, useEffect, useMemo } from "react";
import debounce from "@/lib/debounce";

const ChatHistory = () => {
  const { data: history, error, mutate } = useSWR<ChatHistory[]>("/api/chat/history", fetcher);
  const [edit, setEdit] = React.useState(false);

  const toggleEdit = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    setEdit(!edit);
  };

  const updateTitle = async (chatId: string, title: string): Promise<void> => {
    await fetch("/api/chat/history", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ chat: { id: chatId, title } }),
    }).then((res) => {
      if (res.ok) mutate();
    });
  };

  const deleteChat = async (chatId: string): Promise<void> => {
    await fetch("/api/chat/history", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: chatId }),
    }).then((res) => {
      if (res.ok) mutate();
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Previous Chats</h2>
        <Button variant="outline" size="sm" onClick={toggleEdit}>
          <PenLine size="16px" />
        </Button>
      </div>

      {error && (
        <>
          <p>An error occured getting your history. Try the button below in a while 🐢</p>
          <Button variant="ghost" className="hover:bg-yellow-500" onClick={() => mutate}>
            <RefreshCcw className="mr-2" size="16px" />
            Refresh
          </Button>
        </>
      )}
      {!history && (
        <div className="flex flex-col gap-2 w-full">
          <Skeleton className="w-full h-10 dark:bg-primary" />
          <Skeleton className="w-full h-10 dark:bg-primary" />
          <Skeleton className="w-full h-10 dark:bg-primary" />
        </div>
      )}

      {!error &&
        history &&
        (history.length === 0 ? (
          <p className="text-sm font-light">You have no previous chats</p>
        ) : (
          <ScrollArea className="w-56 h-[50vh] text-white dark:text-black text-sm p-2">
            {history.map((item: ChatHistory) => (
              <ChatHistoryItem {...item} isEdit={edit} deleteChat={deleteChat} updateTitle={updateTitle} key={item._id} />
            ))}
          </ScrollArea>
        ))}
    </div>
  );
};

type ChatHistoryItemProps = {
  _id: string;
  title: string;
  isEdit: boolean;
  deleteChat: (chatId: string) => Promise<void>;
  updateTitle: (chatId: string, title: string) => void;
};

const ChatHistoryItem = ({ _id, title, isEdit, deleteChat, updateTitle }: ChatHistoryItemProps) => {
  const [titleValue, setTitleValue] = React.useState(title);

  useEffect(() => {
    setTitleValue(title);
  }, [title]);

  const memoizedUpdateHandler = useMemo(() => {
    return debounce<typeof updateTitle>(updateTitle, 2000);
  }, [updateTitle]);

  const updateHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitleValue(event.target.value);
    memoizedUpdateHandler(_id, event.target.value);
  };

  const deleteHandler = (_: MouseEvent<SVGSVGElement>) => {
    deleteChat(_id);
  };

  return isEdit ? (
    <div className="w-52 h-10 flex items-center gap-2 mb-2 p-2 bg-primary-foreground text-black dark:text-white rounded-md hover:bg-secondary">
      <Trash2Icon size="16px" onClick={deleteHandler} className="text-red-500 shrink-0 transform hover:text-red-700 hover:scale-110" />
      <input type="text" value={titleValue} onChange={updateHandler} className="capitalize truncate bg-transparent h-full w-full" />
    </div>
  ) : (
    <Link href={`/chat/${_id}`} key={_id} className="w-52 h-10 flex items-center gap-2 mb-2 p-2 bg-primary rounded-md">
      <MessageSquareIcon size="16px" className="shrink-0" />
      <p className="capitalize truncate">{title}</p>
    </Link>
  );
};

export default ChatHistory;
