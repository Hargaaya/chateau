import fetcher from "@/lib/fetcher";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@radix-ui/react-select";
import React, { useState } from "react";
import useSWR from "swr";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  snippet: Snippet;
};

const BoardForm = ({ snippet }: Props) => {
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

export default BoardForm;
