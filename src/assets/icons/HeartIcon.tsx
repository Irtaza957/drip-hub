import React from "react";

const HeartIcon: React.FC<IconProps> = ({
  borderColor = "currentColor",
  fillColor = "currentColor",
  width = 22.903,
  height = 20.232,
  className = "",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 22.903 20.232"
    className={className}
  >
    <path
      id="Path_3"
      data-name="Path 3"
      d="M20.84,4.61a5.5,5.5,0,0,0-7.78,0L12,5.67,10.94,4.61a5.5,5.5,0,0,0-7.78,7.78l1.06,1.06L12,21.23l7.78-7.78,1.06-1.06a5.5,5.5,0,0,0,0-7.78Z"
      transform="translate(-0.549 -1.998)"
      fill={fillColor}
      stroke={borderColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

export default HeartIcon;
