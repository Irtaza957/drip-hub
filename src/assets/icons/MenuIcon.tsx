import React from "react";

const MenuIcon: React.FC<IconProps> = ({
  borderColor = "currentColor",
  width = 21.29,
  height = 14.882,
  className = "",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 21.29 14.882"
    className={className}
  >
    <g
      id="Group_2991"
      data-name="Group 2991"
      transform="translate(-340.21 -16.559)"
    >
      <line
        id="Line_445"
        data-name="Line 445"
        x2="21.29"
        transform="translate(340.21 17.384)"
        stroke={borderColor}
        stroke-width="1.65"
      />
      <line
        id="Line_446"
        data-name="Line 446"
        x2="21.29"
        transform="translate(340.21 24)"
        stroke={borderColor}
        stroke-width="1.65"
      />
      <line
        id="Line_447"
        data-name="Line 447"
        x2="21.29"
        transform="translate(340.21 30.616)"
        stroke={borderColor}
        stroke-width="1.65"
      />
    </g>
  </svg>
);

export default MenuIcon;
