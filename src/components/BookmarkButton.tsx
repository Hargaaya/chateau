"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SelectGroup } from "@radix-ui/react-select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Bookmark } from "lucide-react";
import { useState } from "react";
import { nanoid } from "nanoid";
import hash from "object-hash";

type Props = {
  language: string;
  code: string;
};

const BookmarkButton = ({ language, code }: Props) => {
  const [selectedBoard, setSelectedBoard] = useState<string>("");
  const [addNewBoard, setAddNewBoard] = useState(false);
  const [newBoardName, setNewBoardName] = useState("");
  const [boards, setBoards] = useState<Userboard[]>([]);
  const snippet = {
    language,
    code,
    hash: hash({ language, code }),
  };

  const handleBoardSelect = (id: string) => {
    setSelectedBoard(id);
    console.log("handleBoardSelect");
  };

  const addBoard = () => {
    const id = nanoid();
    const name = newBoardName;
    const newBoard = { id, name, snippets: [snippet] };
    setBoards([...boards, newBoard]);
    console.log("addBoard");
  };

  const saveBoard = () => {
    const board = boards.find((board) => board.id === selectedBoard);
    if (board) {
      const newBoard = {
        ...board,
        snippets: updateSnippets(board.snippets, snippet),
      };
      const newBoards = boards.map((board) => (board.id === selectedBoard ? newBoard : board));
      setBoards(newBoards);
    }
    console.log("saveBoard");
  };

  const updateSnippets = (snippets: Snippet[] | null, newSnippet: Snippet) => {
    const hasPrevSnippets = snippets && snippets.length > 0;

    if (hasPrevSnippets) {
      return [...snippets, newSnippet];
    } else {
      return [newSnippet];
    }
  };

  const toggleAddNewBoard = (_: any) => {
    setAddNewBoard(!addNewBoard);
  };

  const handleSaveClick = () => {
    if (addNewBoard) {
      addBoard();
    } else {
      saveBoard();
    }
  };

  const hasBoards = boards && boards.length > 0;

  return (
    <Popover>
      <PopoverTrigger className="cursor-pointer" asChild>
        <Bookmark size="16px" />
      </PopoverTrigger>
      <PopoverContent className="w-96">
        <div className="grid gap-4">
          <div className="space-y-2 col-span-3 flex justify-between items-center">
            <h4 className="font-medium leading-none">Save Code Snippet</h4>
            <Button className="flex items-center" onClick={toggleAddNewBoard}>
              <span className="ml-2">{!addNewBoard ? "New Board" : "Select Board"}</span>
            </Button>
          </div>
          {addNewBoard ? (
            <Input
              className="col-span-3"
              placeholder="New Board Name"
              value={newBoardName}
              onChange={(e) => setNewBoardName(e.target.value)}
            />
          ) : (
            <Select onValueChange={handleBoardSelect} defaultValue={hasBoards ? boards[0].id : "no-boards"}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Engine" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {hasBoards ? (
                    boards?.map((board: Userboard) => (
                      <SelectItem key={board.id} value={board.id}>
                        {board.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem key="no-boards" disabled value="no-boards">
                      No Boards Found
                    </SelectItem>
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
          <Button className="col-span-3" onClick={handleSaveClick}>
            {addNewBoard ? <span className="ml-2">Add Board</span> : "Save To Board"}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default BookmarkButton;
