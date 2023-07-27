import getCodeTheme from "@/utils/getCodeTheme";
import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { useSelector } from "react-redux";
import { getLocalSettings } from "@/stores/slices/settingsSlice";
import BoardPopover from "../bookmark/BoardPopover";
import CopyButton from "../CopyButton";

type Props = {
  language: string;
  code: string;
};

const CodeBlock = ({ language, code }: Props) => {
  const codeTheme = useSelector(getLocalSettings).codeTheme;

  return (
    <div className="flex flex-col bg-secondary rounded-lg max-w-2xl">
      <span className="flex justify-between items-center p-2">
        <p>{language}</p>
        <span className="flex items-center gap-2">
          <BoardPopover language={language} content={code} />
          <CopyButton content={code} />
        </span>
      </span>
      <SyntaxHighlighter language={language} style={getCodeTheme(codeTheme)}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
