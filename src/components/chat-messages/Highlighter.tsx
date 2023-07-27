import React from "react";
import CodeBlock from "./CodeBlock";
import codeFormatter from "@/utils/codeFormatter";

type Props = {
  message: string;
};

const Highlighter = ({ message }: Props) => {
  const splitMessage = message.split("```");

  return (
    <div className="font-light pt-2 whitespace-pre-wrap">
      {splitMessage.map((text, index) => {
        if (index % 2 === 0) {
          return <p key={index}>{text}</p>;
        } else {
          const { language, formattedText: code } = codeFormatter(text);
          return <CodeBlock key={index} language={language} code={code} />;
        }
      })}
    </div>
  );
};

const MemoizedHighlighter = React.memo(Highlighter);

export default MemoizedHighlighter;
