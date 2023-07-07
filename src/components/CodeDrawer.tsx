import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

const CodeDrawer = () => {
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
        <div className="grid gap-4 py-4"></div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Ooopsie button</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CodeDrawer;
