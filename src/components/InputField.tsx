import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import { ChangeEvent } from "react";

type Props = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  input: string;
  isLoading: boolean;
};

const InputField = ({ handleSubmit, handleInputChange, input, isLoading }: Props) => {
  const handleInputChangeAdapter = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const e = event as unknown;
    handleInputChange(e as ChangeEvent<HTMLInputElement>);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="fixed bottom-0 w-full max-w-3xl flex border-[0.2px] bg-secondary rounded-md p-4 items-center mb-6 gap-4"
    >
      {/* <Input type="text" value={input} placeholder="Enter your prompt..." onChange={handleInputChange} /> */}
      <Textarea value={input} placeholder="Enter your prompt..." onChange={handleInputChangeAdapter} />
      <Button disabled={isLoading} type="submit">
        Submit
      </Button>
    </form>
  );
};

export default InputField;
