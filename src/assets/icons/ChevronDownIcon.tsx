import React from "react";

const ChevronDownIcon: React.FC<IconProps> = ({
  borderColor = "currentColor",
  fillColor = "currentColor",
  width = 18.345,
  height = 11.876,
  className = "",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 18.345 11.876"
    className={className}
  >
    <path
      id="Path_3342"
      data-name="Path 3342"
      d="M14,16.42l6.469,6.469,6.469-6.469,2,2-8.466,8.466L12,18.416Z"
      transform="translate(-11.293 -15.713)"
      fill={fillColor}
      stroke={borderColor}
      strokeWidth="1"
    />
  </svg>
);

export default ChevronDownIcon;
