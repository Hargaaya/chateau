"use client";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ArrowLeftRightIcon, Bookmark, Minimize2 } from "lucide-react";
import { MouseEvent, useState } from "react";
import hash from "object-hash";

import { PopoverClose, PopoverPortal } from "@radix-ui/react-popover";
import BoardForm from "./BoardForm";
import NewBoardForm from "./NewBoardForm";

type Props = {
  language: string;
  content: string;
};

const BoardPopover = ({ language, content }: Props) => {
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

export default BoardPopover;
