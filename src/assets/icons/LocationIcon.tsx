import React from "react";

const LocationIcon: React.FC<IconProps> = ({
  borderColor = "currentColor",
  fillColor = "currentColor",
  width = 16.598,
  height = 22.561,
  className = "",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 16.598 22.561"
    className={className}
  >
    <g id="layer1" transform="translate(-1.197 -288.672)">
      <path
        id="path929"
        d="M9.493,288.8a8.182,8.182,0,0,0-8.171,8.171c0,7.926,7.71,13.951,7.71,13.951a.743.743,0,0,0,.927,0s7.71-6.025,7.71-13.951A8.187,8.187,0,0,0,9.493,288.8Zm0,1.486a6.678,6.678,0,0,1,6.69,6.685c0,6.484-5.871,11.607-6.685,12.3-.81-.69-6.69-5.814-6.69-12.3A6.673,6.673,0,0,1,9.493,290.283Z"
        transform="translate(0)"
        fill={fillColor}
        stroke={borderColor}
        strokeWidth="0.25"
      />
      <path
        id="circle931"
        d="M6.623,290.385a3.715,3.715,0,1,0,3.718,3.713A3.723,3.723,0,0,0,6.623,290.385Zm0,1.486A2.229,2.229,0,1,1,4.4,294.1,2.219,2.219,0,0,1,6.623,291.871Z"
        transform="translate(2.871 2.871)"
        fill={fillColor}
        stroke={borderColor}
        strokeWidth="0.25"
      />
    </g>
  </svg>
);

export default LocationIcon;
