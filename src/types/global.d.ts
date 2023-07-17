interface Chat {
  _id: string;
  title: string;
  messages: ChatCompletion[];
  createdAt?: string;
  updatedAt?: string;
}

interface ChatHistory {
  _id: string;
  title: string;
}

interface ChatCompletion extends ChatCompletionRequestMessage {
  liked: boolean;
}

interface Board {
  _id?: string;
  name: string;
  snippets: Snippet[];
}

interface Snippet {
  hash: string;
  language: string;
  content: string;
}

interface Settings {
  model: string;
  apiKey: string | null;
  theme: string;
  codeTheme: string;
}
