import SyntaxHighlighter from "react-syntax-highlighter";
import CopyIcon from "@/assets/CopyIcon";
import { useSelector } from "react-redux";
import { getLocalSettings } from "@/stores/slices/settingsSlice";
import React from "react";
import BoardPopover from "@/components/bookmark/BoardPopover";
import copyToClipboard from "@/utils/copyToClipboard";
import getCodeTheme from "@/utils/getCodeTheme";
import hash from "object-hash";

type Props = {
  text: string;
};

const Highlighter = ({ text }: Props) => {
  const manipulatedText = text.split("```");
  const codeTheme = useSelector(getLocalSettings).codeTheme;

  const getLanguage = (text: string) => {
    const nextLine = text.split("\n")[0];
    if (nextLine === "") return "javascript";

    return nextLine;
  };

  const removeFirstLine = (text: string) => {
    const lines = text.split("\n");
    lines.shift();

    return lines.join("\n");
  };

  return (
    <>
      {manipulatedText.map((text, index) => {
        if (index % 2 === 0) {
          return <p key={hash(index + text)}>{text}</p>;
        } else {
          const formattedText = removeFirstLine(text);
          const language = getLanguage(text);
          return (
            <div className="flex flex-col bg-secondary rounded-lg max-w-3xl" key={hash(language + formattedText)}>
              <span className="flex justify-between items-center p-2">
                <p>{language}</p>
                <span className="flex items-center gap-2">
                  <BoardPopover language={language} content={formattedText} />
                  <div onClick={() => copyToClipboard(formattedText)}>
                    <CopyIcon className="cursor-pointer" size="16px" />
                  </div>
                </span>
              </span>
              <SyntaxHighlighter language={language} style={getCodeTheme(codeTheme)}>
                {formattedText}
              </SyntaxHighlighter>
            </div>
          );
        }
      })}
    </>
  );
};

const MemoizedHighlighter = React.memo(Highlighter);

export default MemoizedHighlighter;
