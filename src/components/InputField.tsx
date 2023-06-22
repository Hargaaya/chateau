import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  input: string;
  isLoading: boolean;
};

const InputField = ({ handleSubmit, handleInputChange, input, isLoading }: Props) => {
  return (
    <form onSubmit={handleSubmit} className="fixed bottom-0 w-full max-w-3xl flex bg-gray-50 rounded-md p-4 items-center mb-6 gap-4">
      <Input
        className="bg-white border-gray-400"
        type="text"
        value={input}
        placeholder="Enter your prompt..."
        onChange={handleInputChange}
      />
      <Button disabled={isLoading} type="submit">
        Submit
      </Button>
    </form>
  );
};

export default InputField;
