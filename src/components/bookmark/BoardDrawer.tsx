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
import CodeIcon from "@/assets/CodeIcon";
import React from "react";
import BoardList from "./BoardList";

const BoardDrawer = () => {
  return (
    <Sheet>
      <SheetTrigger className="cursor-pointer" asChild>
        <CodeIcon size="28px" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Boards</SheetTitle>
          <SheetDescription>This is where you can find your saved code snippets.</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <BoardList />
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Ooopsie button</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
export default BoardDrawer;
