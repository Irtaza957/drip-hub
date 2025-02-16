import React from "react";

const DollarCircleIcon: React.FC<IconProps> = ({
  borderColor = "currentColor",
  fillColor = "currentColor",
  width = 20.5,
  height = 20.5,
  className = "",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 20.5 20.5"
    className={className}
  >
    <g id="Layer_51" data-name="Layer 51" transform="translate(-5.75 -5.75)">
      <path
        id="Path_3299"
        data-name="Path 3299"
        d="M18.812,12.938a1,1,0,0,0,0-2H17v-.563a1,1,0,0,0-2,0v.671c-1.634.325-2.813,1.418-2.813,2.767S13.366,16.254,15,16.579v2.484H13.187a1,1,0,0,0,0,2H15v.562a1,1,0,0,0,2,0v-.671c1.634-.325,2.812-1.418,2.812-2.766v-.625c0-1.349-1.178-2.442-2.812-2.767V12.938Zm-4.625.875c0-.225.305-.523.813-.707v1.413C14.492,14.335,14.187,14.037,14.187,13.813Zm3.625,3.75v.625c0,.224-.3.522-.812.706V16.856C17.508,17.04,17.812,17.338,17.812,17.563ZM16,6A10,10,0,1,0,26,16,10,10,0,0,0,16,6Zm0,18a8,8,0,1,1,8-8,8,8,0,0,1-8,8Z"
        fill={fillColor}
        stroke={borderColor}
        strokeWidth="0.5"
      />
    </g>
  </svg>
);

export default DollarCircleIcon;
