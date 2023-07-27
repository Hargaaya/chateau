function codeFormatter(text: string) {
  // Get the language from the first line
  const language = text.split("\n")[0];

  // Remove the extra line between lang and code
  const lines = text.split("\n");
  lines.shift();
  const formattedText = lines.join("\n");

  return { language, formattedText };
}

export default codeFormatter;
