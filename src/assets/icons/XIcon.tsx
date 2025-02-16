import React from "react";

const XIcon: React.FC<IconProps> = ({
  borderColor = "currentColor",
  fillColor = "currentColor",
  width = 9.946,
  height = 9.914,
  className = "",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 9.946 9.914"
    className={className}
  >
    <g
      id="Group_3113"
      data-name="Group 3113"
      transform="translate(-2.656 -2.742)"
    >
      <path
        id="Path_3237"
        data-name="Path 3237"
        d="M6.043,6.593a.36.36,0,1,0,.51-.51L3.67,3.2a.36.36,0,0,0-.51.51Z"
        transform="translate(-0.072 -0.064)"
        fill={fillColor}
        stroke={borderColor}
        strokeWidth="0.5"
      />
      <path
        id="Path_3238"
        data-name="Path 3238"
        d="M8.177,7.717l4.069-4.073a.361.361,0,0,0,0-.51.366.366,0,0,0-.51-.062L7.413,7.338H7.306v.125L3.036,11.79a.362.362,0,0,0,.026.51.389.389,0,0,0,.268.106.373.373,0,0,0,.261-.106L7.664,8.227,11.735,12.3a.361.361,0,0,0,.511-.51Z"
        fill={fillColor}
        stroke={borderColor}
        strokeWidth="0.5"
      />
    </g>
  </svg>
);

export default XIcon;
