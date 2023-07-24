"use client";

import fetcher from "@/lib/fetcher";
import { CopyIcon, PenLine, Trash2Icon } from "lucide-react";
import React, { ChangeEvent, useMemo } from "react";
import useSWR from "swr";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import copyToClipboard from "@/utils/copyToClipboard";
import ViewCodeDialog from "../ViewCodeDialog";
import { Button } from "../ui/button";
import debounce from "@/lib/debounce";

const BoardList = () => {
  const [isEdit, setIsEdit] = React.useState<boolean>(false);
  const { data: boards, error, mutate } = useSWR<Board[]>("/api/board", fetcher);
  const toggleEdit = () => setIsEdit(!isEdit);

  const deleteSnippet = async (board: Board, snippetHash: string) => {
    const updatedBoard = {
      ...board,
      snippets: board.snippets.filter((snippet) => snippet.hash !== snippetHash),
    };

    await fetch("/api/board", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ board: updatedBoard }),
    }).then((res) => {
      if (res.ok) mutate();
    });
  };

  const deleteBoard = async (boardId: string) => {
    await fetch("/api/board", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: boardId }),
    }).then((res) => {
      if (res.ok) mutate();
    });
  };

  const updateBoardName = async (board: Board, name: string) => {
    const updatedBoard = {
      ...board,
      name,
    };

    await fetch("/api/board", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ board: updatedBoard }),
    }).then((res) => {
      if (res.ok) mutate();
    });
  };

  if (error) return <p>Failed to load boards</p>;

  if (!boards) return <Skeleton className="col-span-3 h-10 bg-secondary" />;

  return (
    <div className="grid gap-4 py-4">
      {isEdit ? (
        <React.Fragment>
          {boards && (
            <div className="flex flex-col gap-2 w-full mt-2">
              {boards.map((board: Board) => (
                <BoardListItem key={board._id} board={board} deleteBoard={deleteBoard} updateBoardName={updateBoardName} />
              ))}
            </div>
          )}
        </React.Fragment>
      ) : (
        boards && (
          <Accordion type="single" collapsible>
            {Array.isArray(boards) &&
              boards.map((board: Board) => (
                <AccordionItem value={board._id as string} key={board._id}>
                  <AccordionTrigger>{board.name}</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-4">
                      {board.snippets.length === 0 && <p>No snippets saved</p>}
                      {board.snippets.map((snippet) => (
                        <code key={snippet.hash} className="flex items-center justify-between bg-secondary rounded-lg p-2 w-full">
                          <pre className="text-sm truncate w-60">{snippet.content}</pre>
                          <Trash2Icon
                            size="16px"
                            className="cursor-pointer hover:text-red-500"
                            onClick={() => deleteSnippet(board, snippet.hash)}
                          />
                          <ViewCodeDialog language={snippet.language} content={snippet.content} />
                          <CopyIcon
                            size="16px"
                            className="cursor-pointer hover:text-green-500"
                            onClick={() => copyToClipboard(snippet.content)}
                          />
                        </code>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
          </Accordion>
        )
      )}
      <Button variant="outline" onClick={toggleEdit}>
        <PenLine size="16px" className="mr-2" />
      </Button>
    </div>
  );
};

type BoardListItemProps = {
  board: Board;
  deleteBoard: (boardId: string) => void;
  updateBoardName: (board: Board, name: string) => void;
};

const BoardListItem = ({ board, deleteBoard, updateBoardName }: BoardListItemProps) => {
  const [titleValue, setTitleValue] = React.useState("");

  React.useEffect(() => {
    setTitleValue(board.name);
  }, [board]);

  const memoizedUpdateBoardNameHandler = useMemo(() => {
    return debounce<typeof updateBoardName>(updateBoardName, 1500);
  }, [updateBoardName]);

  const updateHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitleValue(event.target.value);
    memoizedUpdateBoardNameHandler(board, event.target.value);
  };

  const deleteHandler = (_: React.MouseEvent<SVGSVGElement>) => {
    deleteBoard(board._id as string);
  };

  return (
    <div className="w-full h-10 flex items-center gap-2 mb-2 p-2 bg-primary-foreground text-black dark:text-white rounded-md hover:bg-secondary">
      <Trash2Icon size="16px" onClick={deleteHandler} className="hover:text-red-500 shrink-0 transform hover:scale-110" />
      <input type="text" value={titleValue} onChange={updateHandler} className="capitalize truncate bg-transparent" />
    </div>
  );
};

export default BoardList;
