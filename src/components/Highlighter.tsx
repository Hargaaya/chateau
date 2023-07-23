import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula, github, gruvboxDark, monokai, vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";
import CopyIcon from "@/assets/CopyIcon";
import { useToast } from "./ui/use-toast";
import { useSelector } from "react-redux";
import { getLocalSettings } from "@/stores/slices/settingsSlice";
import React from "react";
import BoardPopover from "@/components/bookmark/BoardPopover";

type Props = {
  text: string;
};

const Highlighter = ({ text }: Props) => {
  const manipulatedText = text.split("```");
  const { toast } = useToast();
  const codeTheme = useSelector(getLocalSettings).codeTheme;

  const getTheme = (theme: string) => {
    switch (theme) {
      case "dracula":
        return dracula;
      case "github":
        return github;
      case "vs2015":
        return vs2015;
      case "monokai":
        return monokai;
      case "gruvbox-dark":
        return gruvboxDark;
      default:
        return vs2015;
    }
  };

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

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      description: "Copied to clipboard",
    });
  };

  return (
    <>
      {manipulatedText.map((text, index) => {
        if (index % 2 === 0) {
          return <p key={index}>{text}</p>;
        } else {
          const formattedText = removeFirstLine(text);
          const language = getLanguage(text);
          return (
            <div className="flex flex-col bg-secondary rounded-lg overflow-clip" key={index}>
              <span className="flex justify-between items-center p-2">
                <p>{language}</p>
                <span className="flex items-center gap-2">
                  <BoardPopover language={language} content={formattedText} />
                  <div onClick={() => copy(formattedText)}>
                    <CopyIcon className="cursor-pointer" size="16px" />
                  </div>
                </span>
              </span>
              <SyntaxHighlighter key={index} language={language} style={getTheme(codeTheme)}>
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
