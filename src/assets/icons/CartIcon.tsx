import React from "react";

const CartIcon: React.FC<IconProps> = ({
  borderColor = "currentColor",
  width = 24,
  height = 23,
  className = "",
}) => (
  <svg
    id="Group_2"
    data-name="Group 2"
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 23"
    className={className}
  >
    <circle
      id="Ellipse_6"
      data-name="Ellipse 6"
      cx="1"
      cy="1"
      r="1"
      transform="translate(8 20)"
      fill="none"
      stroke={borderColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <circle
      id="Ellipse_7"
      data-name="Ellipse 7"
      cx="1"
      cy="1"
      r="1"
      transform="translate(19 20)"
      fill="none"
      stroke={borderColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <path
      id="Path_2"
      data-name="Path 2"
      d="M1,1H5L7.68,14.39a2,2,0,0,0,2,1.61H19.4a2,2,0,0,0,2-1.61L23,6H6"
      fill="none"
      stroke={borderColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

export default CartIcon;
