import fetcher from "@/lib/fetcher";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  snippet: Snippet;
};

const BoardForm = ({ snippet }: Props) => {
  const { data: boards, error, mutate } = useSWR<Board[]>("/api/board", fetcher);
  const [selectedBoard, setSelectedBoard] = useState<string | null>(null);
  const [valueExists, setValueExists] = useState<boolean>(false);

  useEffect(() => {
    if (!selectedBoard) return;

    const board = boards?.find((board) => board._id === selectedBoard);
    if (!board) return;

    const snippetExists = board.snippets.find((s) => s.hash === snippet.hash);
    if (snippetExists) {
      setValueExists(true);
      return;
    }

    setValueExists(false);
  }, [selectedBoard, boards, snippet.hash]);

  const handleSaveClick = () => {
    if (!selectedBoard) return;
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
    }).then((res) => {
      if (res.ok) mutate();
    });
  };

  const checkExistence = (board: Board, snippetHash: string): string => {
    const isInList = board.snippets.find((s) => s.hash === snippetHash);
    if (!isInList) {
      if (board.snippets.length === 0) return "Empty";
      return board.snippets.length.toString();
    }

    return "Already saved";
  };

  if (error) return <p>Failed to load boards</p>;

  if (!boards) return <Skeleton className="col-span-3 h-10 bg-secondary" />;

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
                      {board.name} ({checkExistence(board, snippet.hash)})
                    </SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button className="col-span-1" onClick={handleSaveClick} disabled={valueExists}>
            Save
          </Button>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default BoardForm;
