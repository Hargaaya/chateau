import React from "react";
import { dracula, github, gruvboxDark, monokai, vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";

function getCodeTheme(theme: string): { [key: string]: React.CSSProperties } {
  switch (theme) {
    case "dracula":
      return dracula;
    case "github":
      return github;
    case "vs2015":
      return vs2015;
    case "monokai":
      return monokai;
    case "gruvbox-dark":
      return gruvboxDark;
    default:
      return vs2015;
  }
}

export default getCodeTheme;
