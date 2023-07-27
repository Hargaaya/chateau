import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import React from "react";
import BoardList from "./BoardList";
import { ArrowRightFromLineIcon, Code2 } from "lucide-react";

const BoardDrawer = () => {
  return (
    <Sheet>
      <SheetTrigger className="cursor-pointer" asChild>
        <Code2 size="28px" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Boards</SheetTitle>
          <SheetDescription>This is where you can find your saved code snippets.</SheetDescription>
        </SheetHeader>
        <BoardList />
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="ghost" className="w-full">
              <ArrowRightFromLineIcon size="16px" className="mr-2" />
              Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
export default BoardDrawer;
