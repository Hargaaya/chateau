import React from "react";

type Props = {
  size?: string;
  color?: string;
  className?: string;
};

const CodeIcon = ({ size = "1em", color = "currentColor", className = "" }: Props) => {
  return (
    <svg className={className} height={size} width={size} fill={color} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <g strokeWidth="0"></g>
      <g strokeLinecap="round" strokeLinejoin="round"></g>
      <g>
        <path d="m9.539.613-3.9 14.55 1.209.324L10.746.937 9.54.612zm-5.63 3.434L.598 7.137a1.24 1.24 0 0 0 0 1.821l3.25 3.091.921-.85-3.321-3.15 3.321-3.112-.86-.89zm11.893 3.091-3.31-3.091-.861.91 3.32 3.091-3.32 3.111.92.85 3.251-3.05a1.242 1.242 0 0 0 0-1.821z"></path>
      </g>
    </svg>
  );
};

export default CodeIcon;