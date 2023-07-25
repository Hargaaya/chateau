import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { useSelector } from "react-redux";
import { getLocalSettings } from "@/stores/slices/settingsSlice";
import getCodeTheme from "@/utils/getCodeTheme";
import { EyeIcon } from "lucide-react";

type Props = {
  language: string;
  content: string;
};

const ViewCodeDialog = ({ language, content }: Props) => {
  const codeTheme = useSelector(getLocalSettings).codeTheme;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <EyeIcon size="16px" className="cursor-pointer hover:text-blue-500" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[calc(100vw-4rem)] max-h-[80vh] overflow-auto">
        <span className="p-2 mt-2">
          <div className="rounded-lg overflow-clip text-md">
            <SyntaxHighlighter language={language} style={getCodeTheme(codeTheme)}>
              {content}
            </SyntaxHighlighter>
          </div>
        </span>
      </DialogContent>
    </Dialog>
  );
};

export default ViewCodeDialog;
