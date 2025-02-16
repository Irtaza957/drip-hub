import React from "react";

const UserIcon: React.FC<IconProps> = ({
  fillColor = "currentColor",
  width = 17.731,
  height = 22.164,
  className = "",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 17.731 22.164"
    className={className}
  >
    <g id="Layer_19" data-name="Layer 19" transform="translate(-4 -1)">
      <path
        id="Path_3607"
        data-name="Path 3607"
        d="M13.91,12.821a5.91,5.91,0,1,1,5.91-5.91A5.91,5.91,0,0,1,13.91,12.821Zm0-10.343A4.433,4.433,0,1,0,18.343,6.91,4.433,4.433,0,0,0,13.91,2.478Z"
        transform="translate(-1.045)"
        fill={fillColor}
      />
      <path
        id="Path_3608"
        data-name="Path 3608"
        d="M18.037,27.591H7.694A3.694,3.694,0,0,1,4,23.9V20.942a.739.739,0,0,1,.362-.635L8.056,18.09a.739.739,0,0,1,.739,1.271l-3.317,2V23.9a2.216,2.216,0,0,0,2.216,2.216H18.037A2.216,2.216,0,0,0,20.253,23.9V21.363l-3.332-2a.739.739,0,1,1,.739-1.271l3.694,2.216a.739.739,0,0,1,.377.635V23.9a3.694,3.694,0,0,1-3.694,3.694Z"
        transform="translate(0 -4.427)"
        fill={fillColor}
      />
    </g>
  </svg>
);

export default UserIcon;
