import React from "react";

type Props = {
  size?: string;
  color?: string;
  className?: string;
};

const PlusIcon = ({ size = "1em", color = "currentColor", className }: Props) => {
  return (
    <svg className={className} height={size} width={size} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none">
      <g strokeWidth="0"></g>
      <g strokeLinecap="round" strokeLinejoin="round"></g>
      <path fill={color} fillRule="evenodd" d="M9 17a1 1 0 102 0v-6h6a1 1 0 100-2h-6V3a1 1 0 10-2 0v6H3a1 1 0 000 2h6v6z"></path>
    </svg>
  );
};

export default PlusIcon;
