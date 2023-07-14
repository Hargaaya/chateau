import { signIn, useSession } from "next-auth/react";
import React from "react";
import { Button } from "./ui/button";
import { GithubIcon } from "lucide-react";
import Image from "next/image";

type Props = {
  children: React.ReactNode;
};

const AuthWrapper = ({ children }: Props) => {
  const { data: session, status } = useSession();

  if (session) {
    return <>{children}</>;
  }

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <Image src="/brain.png" width={100} height={100} alt="Loading" className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="flex flex-col gap-4 bg-secondary rounded-xl p-8 h-min w-96 text-center">
        <h3 className="mb-4">Please sign in to continue</h3>
        <Button className="w-full" onClick={() => signIn("github")}>
          <GithubIcon className="mr-2" />
          Sign In with Github
        </Button>
        <p className="text-xs">
          By continuing, you agree to my non existent <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
};

export default AuthWrapper;
