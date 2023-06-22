import React from "react";

type Props = {
  size?: string;
  color?: string;
  className?: string;
};

const CopyIcon = ({ size = "1em", color = "currentColor", className }: Props) => {
  return (
    <svg className={className} height={size} width={size} viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill={color}>
      <g strokeWidth="0"></g>
      <g strokeLinecap="round" strokeLinejoin="round"></g>
      <g>
        <path
          fill={color}
          d="M768 832a128 128 0 0 1-128 128H192A128 128 0 0 1 64 832V384a128 128 0 0 1 128-128v64a64 64 0 0 0-64 64v448a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64h64z"
        ></path>
        <path
          fill={color}
          d="M384 128a64 64 0 0 0-64 64v448a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64V192a64 64 0 0 0-64-64H384zm0-64h448a128 128 0 0 1 128 128v448a128 128 0 0 1-128 128H384a128 128 0 0 1-128-128V192A128 128 0 0 1 384 64z"
        ></path>
      </g>
    </svg>
  );
};

export default CopyIcon;
