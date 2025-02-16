import React from "react";

const BookingIcon: React.FC<IconProps> = ({
  borderColor = "currentColor",
  width = 15.851,
  height = 19.439,
  className = "",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 15.851 19.439"
    className={className}
  >
    <g
      id="_324-Document"
      data-name="324-Document"
      transform="translate(-3.25 -0.25)"
    >
      <path
        id="Path_3609"
        data-name="Path 3609"
        d="M7.588,1,4,4.588V18.939H18.351V1Z"
        fill="none"
        stroke={borderColor}
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        id="Path_3610"
        data-name="Path 3610"
        d="M7.588,1V4.588H4"
        fill="none"
        stroke={borderColor}
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <line
        id="Line_586"
        data-name="Line 586"
        x2="6"
        transform="translate(6 8.939)"
        fill="none"
        stroke={borderColor}
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <line
        id="Line_587"
        data-name="Line 587"
        x2="10"
        transform="translate(6 11.939)"
        fill="none"
        stroke={borderColor}
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <line
        id="Line_588"
        data-name="Line 588"
        x2="10"
        transform="translate(6 14.939)"
        fill="none"
        stroke={borderColor}
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </g>
  </svg>
);

export default BookingIcon;
