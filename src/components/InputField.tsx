import { Button } from "@/components/ui/button";
import { Textarea } from "./ui/textarea";
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getLocalSettings } from "@/stores/slices/settingsSlice";
import validateApiKey from "@/utils/validateApiKey";
import InputToolbar from "./InputToolbar";

type Props = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
  stop: () => void;
  reload: () => Promise<string | null | undefined>;
  input: string;
  isLoading: boolean;
};

const InputField = ({ handleSubmit, handleInputChange, stop, reload, input, isLoading }: Props) => {
  const apiKey = useSelector(getLocalSettings).apiKey;
  const [disabled, setDisabled] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const form = useRef<HTMLFormElement>(null);
  const textarea = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!apiKey) {
      setError("No API key was provided 😇");
      return;
    }

    const isValid = validateApiKey(apiKey);
    if (!isValid) {
      setError("The API key provided is not valid 🙄");
      return;
    }

    if (isLoading) return;

    setDisabled(false);
    setError(null);
  }, [isLoading, apiKey]);

  const handleInputChangeAdapter = (event: ChangeEvent<HTMLTextAreaElement>) => {
    handleInputChange(event);
    handleTextAreaSize(event);
  };

  const handleTextAreaSize = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value, style } = event.target;
    const rows = value.split("\n").length;
    const minHeight = 2.25;
    const rowHeight = 1.25;

    if (rows > 1) {
      const height = Math.min(minHeight + rowHeight * rows - 1, 7.25);
      style.height = height + "rem";
    } else {
      style.height = minHeight + "rem";
    }
  };

  const handleEnterClick = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      if (event.shiftKey) return;
      event.preventDefault();
      if (form.current && textarea.current) {
        form.current.requestSubmit();
        textarea.current.style.height = 2.25 + "rem";
      }
    }
  };

  return (
    <div className="fixed bottom-0 mb-4 w-full max-w-3xl flex-col border-[0.2px] rounded-md gap-2 bg-secondary overflow-hidden">
      <form onSubmit={handleSubmit} ref={form} className="w-full flex items-end gap-4 p-4">
        {error ? (
          <p className="w-full text-center">{error}</p>
        ) : (
          <>
            <Textarea
              className="border-none overflow-y-auto resize-none h-9 min-h-9"
              ref={textarea}
              value={input}
              placeholder="Enter your prompt..."
              onChange={handleInputChangeAdapter}
              onKeyDown={handleEnterClick}
            />
            <Button disabled={disabled} type="submit">
              Submit
            </Button>
          </>
        )}
      </form>
      <InputToolbar stop={stop} reload={reload} />
    </div>
  );
};

export default InputField;
