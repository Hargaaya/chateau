import { RefreshCw, StopCircle } from "lucide-react";
import React from "react";

type Props = {
  stop: () => void;
  reload: () => Promise<string | null | undefined>;
};

const InputToolbar = ({ stop, reload }: Props) => {
  return (
    <div className="w-full bg-primary flex gap-4 p-2">
      <ToolbarItem action={stop}>
        <StopCircle size="16px" />
        Stop Generating
      </ToolbarItem>
      <ToolbarItem action={reload}>
        <RefreshCw size="16px" />
        Reload Answer
      </ToolbarItem>
    </div>
  );
};

const ToolbarItem = ({ children, action }: { children: React.ReactNode; action: () => void }) => {
  return (
    <div className="text-sm flex text-white dark:text-black items-center cursor-pointer gap-2 hover:opacity-50" onClick={action}>
      {children}
    </div>
  );
};

export default InputToolbar;
