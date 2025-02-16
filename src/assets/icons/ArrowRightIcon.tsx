import React from "react";

const ArrowRightIcon: React.FC<IconProps> = ({
  fillColor = "currentColor",
  width = 30.099,
  height = 19.553,
  className = "",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 30.099 19.553"
    className={className}
  >
    <path
      id="Path_3329"
      data-name="Path 3329"
      d="M23.592,6.343l-2.438,2.45,5.652,5.625-23.513.024,0,3.457,23.449-.024-5.557,5.583,2.45,2.438,9.754-9.8Z"
      transform="translate(-3.292 -6.343)"
      fill={fillColor}
    />
  </svg>
);

export default ArrowRightIcon;
