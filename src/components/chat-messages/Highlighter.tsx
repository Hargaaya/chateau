import React, { MouseEvent } from "react";
import CodeBlock from "./CodeBlock";
import codeFormatter from "@/utils/codeFormatter";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "../ui/button";
import { Copy, GitForkIcon } from "lucide-react";
import copyToClipboard from "@/utils/copyToClipboard";

type Props = {
  index: number;
  message: string;
  forkChat: (index: number) => void;
};

const Highlighter = ({ index, message, forkChat }: Props) => {
  const splitMessage = message.split("```");
  const forkChatHandler = (_: MouseEvent<HTMLButtonElement>) => forkChat(index);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="font-light pt-2 whitespace-pre-wrap w-full">
            {splitMessage.map((text, index) => {
              if (index % 2 === 0) {
                return <p key={index}>{text}</p>;
              } else {
                const { language, formattedText: code } = codeFormatter(text);
                return <CodeBlock key={index} language={language} code={code} />;
              }
            })}
          </div>
        </TooltipTrigger>
        <TooltipContent className="flex">
          <Button variant="ghost" className="flex gap-2" onClick={forkChatHandler}>
            <GitForkIcon size="16px" />
            Fork
          </Button>
          <Button variant="ghost" className="flex gap-2" onClick={() => copyToClipboard(message)}>
            <Copy size="16px" />
            Copy
          </Button>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const MemoizedHighlighter = React.memo(Highlighter);

export default MemoizedHighlighter;
