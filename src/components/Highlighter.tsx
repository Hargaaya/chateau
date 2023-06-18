import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

type Props = {
  text: string;
};

const Highlighter = ({ text }: Props) => {
  // split text where there is three ``` which is the start of a code block
  const manipulatedText = text.split("```");

  const language = (text: string) => {
    // grap the next line after the code block
    const nextLine = text.split("\n")[0];

    console.log(nextLine);
    return nextLine;
  };

  return (
    <>
      {manipulatedText.map((text, index) => {
        if (index % 2 === 0) {
          return <p key={index}>{text}</p>;
        } else {
          return (
            <SyntaxHighlighter key={index} language={language(text)} style={docco}>
              {text}
            </SyntaxHighlighter>
          );
        }
      })}
    </>
  );
};

export default Highlighter;
