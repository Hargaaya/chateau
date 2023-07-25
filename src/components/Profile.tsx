"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Session } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LockIcon, MessageSquareIcon, RefreshCcw, SkullIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";

const Profile = () => {
  const {
    data: { user },
  } = useSession() as { data: Session };
  const name = user?.name || "User";
  const image = user?.image || "/brain.png";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Avatar>
          <AvatarImage src={image} alt={name} />
          <AvatarFallback className="bg-black text-white">YOU</AvatarFallback>
        </Avatar>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-center gap-2">
            <Link target="_blank" href="https://hargaaya.com/" className={`${buttonVariants({ variant: "outline" })} w-full`}>
              <MessageSquareIcon className="mr-2" size="16px" />
              Send Feedback
            </Link>
            <Button variant="destructive" className="w-full">
              <SkullIcon className="mr-2" size="16px" />
              Delete Account
            </Button>
            <Button className="w-full" onClick={() => signOut()}>
              <LockIcon className="mr-2" size="16px" />
              Sign Out
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Profile;
