import React from "react";

const MagnifierIcon: React.FC<IconProps> = ({
  borderColor = "currentColor",
  width = 25.958,
  height = 25.958,
  className = "",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 25.958 25.958"
    className={className}
  >
    <g
      id="Group_3195"
      data-name="Group 3195"
      transform="translate(-1.543 -1.543)"
    >
      <circle
        id="Ellipse_484"
        data-name="Ellipse 484"
        cx="10.5"
        cy="10.5"
        r="10.5"
        transform="translate(2.543 2.543)"
        fill="none"
        stroke={borderColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <line
        id="Line_460"
        data-name="Line 460"
        x1="5.579"
        y1="5.579"
        transform="translate(20.508 20.508)"
        fill="none"
        stroke={borderColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </g>
  </svg>
);

export default MagnifierIcon;
