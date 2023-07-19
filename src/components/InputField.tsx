import { Button } from "@/components/ui/button";
import { Textarea } from "./ui/textarea";
import { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getLocalSettings } from "@/stores/slices/settingsSlice";
import validateApiKey from "@/utils/validateApiKey";

type Props = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  input: string;
  isLoading: boolean;
};

const InputField = ({ handleSubmit, handleInputChange, input, isLoading }: Props) => {
  const apiKey = useSelector(getLocalSettings).apiKey;
  const [disabled, setDisabled] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
    const e = event as unknown;
    handleInputChange(e as ChangeEvent<HTMLInputElement>);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="fixed bottom-0 w-full max-w-3xl flex border-[0.2px] bg-secondary rounded-md p-4 items-center mb-6 gap-4"
    >
      {error ? (
        <p className="w-full text-center">{error}</p>
      ) : (
        <>
          <Textarea value={input} placeholder="Enter your prompt..." onChange={handleInputChangeAdapter} />
          <Button disabled={disabled} type="submit">
            Submit
          </Button>
        </>
      )}
    </form>
  );
};

export default InputField;
