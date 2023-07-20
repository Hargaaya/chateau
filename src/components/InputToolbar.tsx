import { type RequestOptions } from "ai/dist";
import { RefreshCw, StopCircle } from "lucide-react";
import React from "react";

type Props = {
  stop: () => void;
  reload: (options?: RequestOptions) => Promise<string | null | undefined>;
};

const InputToolbar = ({ stop, reload }: Props) => {
  return (
    <div className="w-full bg-primary flex gap-4 p-2">
      <ToolbarItem action={stop}>
        <StopCircle size="16px" className="text-white" />
        Stop Generating
      </ToolbarItem>
      <ToolbarItem action={reload}>
        <RefreshCw size="16px" className="text-white" />
        Reload Answer
      </ToolbarItem>
    </div>
  );
};

const ToolbarItem = ({ children, action }: { children: React.ReactNode; action: () => void }) => {
  return (
    <div className="text-sm text-white flex items-center cursor-pointer gap-2 hover:opacity-50" onClick={action}>
      {children}
    </div>
  );
};

export default InputToolbar;
