import React from "react";

type IconProps = {
  borderColor?: string;
  fillColor?: string;
  width?: string | number;
  height?: string | number;
  className?: string;
};

const BellIcon = ({
  borderColor = "currentColor",
  fillColor = "currentColor",
  width = 17.559,
  height = 20.852,
  className = "",
}: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 17.559 20.852"
    className={className}
  >
    <g
      id="Group_2587"
      data-name="Group 2587"
      transform="translate(0.375 0.375)"
    >
      <rect
        id="Rectangle_1526"
        data-name="Rectangle 1526"
        width="4.358"
        height="2.179"
        transform="translate(6.225 17.923)"
        fill={fillColor}
        stroke={borderColor}
        strokeWidth="0.75"
      />
      <path
        id="Path_3122"
        data-name="Path 3122"
        d="M33.281,29.9V23.786a6.871,6.871,0,0,0-5.921-6.8V15h-1.91v1.984a6.871,6.871,0,0,0-5.921,6.8V29.9H18v1.91H34.809V29.9Zm-1.91,0H21.438V23.786a4.966,4.966,0,1,1,9.932,0Z"
        transform="translate(-18 -15)"
        fill={fillColor}
        stroke={borderColor}
        strokeWidth="0.75"
      />
    </g>
  </svg>
);

export default BellIcon;
