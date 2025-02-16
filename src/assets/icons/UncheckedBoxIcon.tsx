import React from "react";

const UncheckedBoxIcon: React.FC<IconProps> = ({
  width = 19,
  height = 19,
  className = "",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 19 19"
    className={className}
  >
    <g
      id="Rectangle_1929"
      data-name="Rectangle 1929"
      fill="none"
      stroke="#ff4b57"
      strokeWidth="1"
    >
      <rect width="19" height="19" stroke="none" />
      <rect x="0.5" y="0.5" width="18" height="18" fill="none" />
    </g>
  </svg>
);

export default UncheckedBoxIcon;
