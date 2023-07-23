"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SelectGroup } from "@radix-ui/react-select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ArrowLeftRightIcon, Bookmark, CrossIcon, Crosshair, Minimize2, PlusCircle } from "lucide-react";
import React, { ChangeEvent, MouseEvent, useState } from "react";
import hash from "object-hash";
import fetcher from "@/lib/fetcher";
import useSWR from "swr";
import { Skeleton } from "./ui/skeleton";
import { PopoverClose, PopoverPortal } from "@radix-ui/react-popover";

type Props = {
  language: string;
  content: string;
};

const BookmarkButton = ({ language, content }: Props) => {
  const [newBoard, setNewBoard] = useState(false);
  const toggleMode = (_?: MouseEvent<HTMLButtonElement>) => setNewBoard(!newBoard);
  const snippet = {
    hash: hash({ language, content }),
    language,
    content,
  };

  return (
    <Popover>
      <PopoverTrigger className="cursor-pointer" asChild>
        <Bookmark size="16px" />
      </PopoverTrigger>
      <PopoverPortal>
        <PopoverContent className="w-96">
          <div className="grid gap-4">
            <div className="space-y-2 col-span-3 flex gap-4 items-baseline">
              <h3 className="font-medium leading-none">Save Code Snippet</h3>
              <Button variant="outline" size="sm" onClick={toggleMode}>
                <ArrowLeftRightIcon size="16px" />
              </Button>
            </div>
            {newBoard ? <NewBoardForm snippet={snippet} /> : <BoardForm snippet={snippet} />}

            <PopoverClose className="col-span-3">
              <Button variant="ghost" className="w-full">
                <Minimize2 size="16px" className="mr-2" />
                Close
              </Button>
            </PopoverClose>
          </div>
        </PopoverContent>
      </PopoverPortal>
    </Popover>
  );
};

type NewBoardFormProps = {
  snippet: Snippet;
};

const NewBoardForm = ({ snippet }: NewBoardFormProps) => {
  const [boardName, setBoardName] = useState("");
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => setBoardName(event.target.value);

  const handleAddClick = async (_: MouseEvent<HTMLButtonElement>) => {
    const board = {
      name: boardName,
      snippets: [snippet],
    };

    await fetch("/api/board", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ board }),
    }).then((res) => {
      if (res.ok) {
        setBoardName("");
      }
    });
  };

  return (
    <React.Fragment>
      <Input className="col-span-2" placeholder="New Board Name" value={boardName} onChange={handleNameChange} />
      <Button className="col-span-1" onClick={handleAddClick}>
        Add Board
      </Button>
    </React.Fragment>
  );
};

type BoardFormProps = {
  snippet: Snippet;
};

const BoardForm = ({ snippet }: BoardFormProps) => {
  const { data: boards, error } = useSWR<Board[]>("/api/board", fetcher);
  const [selectedBoard, setSelectedBoard] = useState<string>("");

  const handleSaveClick = () => {
    if (selectedBoard === "") return;
    const board = boards?.find((board) => board._id === selectedBoard);
    if (!board) return;

    const snippetExists = board.snippets.find((s) => s.hash === snippet.hash);
    if (snippetExists) return;

    board.snippets.push(snippet);

    fetch("/api/board", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ board }),
    });
  };

  if (error) return <p>Failed to load boards</p>;

  if (!boards) return <Skeleton className="col-span-3 h-10 bg-secondary" />;

  console.log(boards);

  return (
    <React.Fragment>
      {boards && (
        <React.Fragment>
          <Select onValueChange={(val) => setSelectedBoard(val)} disabled={!Array.isArray(boards)}>
            <SelectTrigger className="col-span-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {Array.isArray(boards) &&
                  boards.map((board: Board) => (
                    <SelectItem key={board._id} value={board._id as string}>
                      {board.name}
                    </SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button className="col-span-1" onClick={handleSaveClick}>
            Save
          </Button>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default BookmarkButton;
