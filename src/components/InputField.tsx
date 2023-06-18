import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SelectGroup } from "@radix-ui/react-select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  input: string;
  isLoading: boolean;
  engine: string;
  setEngine: (value: string) => void;
};

const InputField = ({ handleSubmit, handleInputChange, input, isLoading, engine, setEngine }: Props) => {
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
      <Select onValueChange={(value) => setEngine(value)} value={engine}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Engine" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="gpt-3.5-turbo">gpt-3.5-turbo</SelectItem>
            <SelectItem value="gpt-3.5-turbo-16k">gpt-3.5-turbo-16k</SelectItem>
            <SelectItem disabled value="gpt-4">
              gpt-4 (Limited beta)
            </SelectItem>
            <SelectItem disabled value="gpt-4-32k">
              gpt-4-32k (Limited beta)
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </form>
  );
};

export default InputField;
