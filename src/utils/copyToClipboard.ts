import { toast } from "@/components/ui/use-toast";

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
  toast({
    description: "Copied to clipboard",
  });
};

export default copyToClipboard;
