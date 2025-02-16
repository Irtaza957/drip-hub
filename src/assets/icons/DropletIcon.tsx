import React from "react";

const DropletIcon: React.FC<IconProps> = ({
  fillColor = "currentColor",
  width = 12.523,
  height = 15.192,
  className = "",
}) => (
  <svg
    id="Group_2893"
    data-name="Group 2893"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={width}
    height={height}
    viewBox="0 0 12.523 15.192"
    className={className}
  >
    <defs>
      <clipPath id="clip-path">
        <rect
          id="Rectangle_51"
          data-name="Rectangle 51"
          width={width}
          height={height}
          fill={fillColor}
        />
      </clipPath>
    </defs>
    <g
      id="Group_46"
      data-name="Group 46"
      transform="translate(0 0)"
      clip-path="url(#clip-path)"
    >
      <path
        id="Path_37"
        data-name="Path 37"
        d="M6.271,15.192A6.267,6.267,0,0,1,.444,6.583a14.774,14.774,0,0,1,3.767-5.2c.369-.358.754-.7,1.153-1.026a1.283,1.283,0,0,1,1.7-.063,16.1,16.1,0,0,1,4.97,6.188,6.267,6.267,0,0,1-5.762,8.711M6.285,1.4a16.884,16.884,0,0,0-4.1,4.674A5.425,5.425,0,0,0,1.445,9.86a4.914,4.914,0,0,0,6.113,3.773,4.854,4.854,0,0,0,3.315-6.319C10,4.84,8.185,3.08,6.285,1.4"
        transform="translate(0 0)"
        fill={fillColor}
      />
      <path
        id="Path_39"
        data-name="Path 39"
        d="M80.331,108.375a1.562,1.562,0,0,1-.057.277,3.962,3.962,0,0,1-2.528,2.443.665.665,0,0,1-.874-.4.65.65,0,0,1,.4-.874,2.87,2.87,0,0,0,1.75-1.708.63.63,0,0,1,.794-.411.657.657,0,0,1,.519.668"
        transform="translate(-70.228 -98.44)"
        fill={fillColor}
      />
    </g>
  </svg>
);

export default DropletIcon;
