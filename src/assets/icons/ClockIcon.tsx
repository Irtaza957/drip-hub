import React from "react";

const ClockIcon: React.FC<IconProps> = ({
  fillColor = "currentColor",
  width = 15.192,
  height = 15.192,
  className = "",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 15.192 15.192"
    className={className}
  >
    <g id="g1307" transform="translate(0 0)">
      <path
        id="path1301"
        d="M9.6,292.65a7.6,7.6,0,1,0,7.6,7.6A7.607,7.607,0,0,0,9.6,292.65Zm0,1.519a6.077,6.077,0,1,1-6.077,6.077A6.065,6.065,0,0,1,9.6,294.17Z"
        transform="translate(-2 -292.65)"
        fill={fillColor}
      />
      <path
        id="path1303"
        d="M11.76,296.65a.76.76,0,0,0-.76.76v3.774a.759.759,0,0,0,.224.538l2.279,2.264a.76.76,0,0,0,1.071-1.077l-2.055-2.041V297.41A.76.76,0,0,0,11.76,296.65Z"
        transform="translate(-4.164 -293.612)"
        fill={fillColor}
      />
    </g>
  </svg>
);

export default ClockIcon;
