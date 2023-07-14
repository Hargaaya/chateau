interface ChatCompletion {
  _id: string;
  email: string;
  text: string;
  messages: ChatCompletionRequestMessage[];
}

interface Userboard {
  id: string;
  name: string;
  snippets: Snippet[] | null;
}

interface Snippet {
  hash: string;
  language: string;
  code: string;
}
