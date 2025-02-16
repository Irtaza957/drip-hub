import React from "react";

const LocationIconTwo: React.FC<IconProps> = ({
  borderColor = "currentColor",
  fillColor = "currentColor",
  width = 17.765,
  height = 20.956,
  className = "",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 17.765 20.956"
    className={className}
  >
    <path
      id="Path_3193"
      data-name="Path 3193"
      d="M20.46,9.63A8.5,8.5,0,1,0,6,16.46l5.3,5.31a1,1,0,0,0,1.42,0L18,16.46A8.46,8.46,0,0,0,20.46,9.63ZM16.6,15.05,12,19.65l-4.6-4.6A6.49,6.49,0,0,1,5.53,9.83,6.57,6.57,0,0,1,8.42,5a6.47,6.47,0,0,1,7.16,0,6.57,6.57,0,0,1,2.89,4.81,6.49,6.49,0,0,1-1.87,5.24ZM12,6a4.5,4.5,0,1,0,4.5,4.5A4.5,4.5,0,0,0,12,6Zm0,7a2.5,2.5,0,1,1,2.5-2.5A2.5,2.5,0,0,1,12,13Z"
      transform="translate(-3.117 -1.485)"
      fill={fillColor}
      stroke={borderColor}
      stroke-width="0.75"
    />
  </svg>
);

export default LocationIconTwo;
