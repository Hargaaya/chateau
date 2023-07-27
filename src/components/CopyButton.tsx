import copyToClipboard from "@/utils/copyToClipboard";
import { CopyIcon } from "lucide-react";
import { MouseEvent } from "react";

type Props = {
  content: string;
};

const CopyButton = ({ content }: Props) => {
  const copyHandler = (_: MouseEvent<SVGSVGElement>) => copyToClipboard(content);
  return <CopyIcon size="16px" className="cursor-pointer" onClick={copyHandler} />;
};

export default CopyButton;
