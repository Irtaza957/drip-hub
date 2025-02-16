import React from "react";

const CheckedBoxIcon: React.FC<IconProps> = ({
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
      id="Group_4177"
      data-name="Group 4177"
      transform="translate(-876 -424.514)"
    >
      <g
        id="Path_3330"
        data-name="Path 3330"
        transform="translate(876 424.514)"
        fill="#ff4b57"
      >
        <path
          d="M 18.5 18.5 L 0.5 18.5 L 0.5 0.5 L 18.5 0.5 L 18.5 18.5 Z"
          stroke="none"
        />
        <path
          d="M 1 1 L 1 18 L 18 18 L 18 1 L 1 1 M 0 0 L 19 0 L 19 19 L 0 19 L 0 0 Z"
          stroke="none"
          fill="#ff4b57"
        />
      </g>
      <g id="icons" transform="translate(877.106 422.128)">
        <path
          id="check_x5F_mark_1_"
          d="M6.524,14.8,3.108,11.387a.437.437,0,0,1,0-.575l.539-.539a.437.437,0,0,1,.575,0l2.589,2.589,5.753-5.753a.437.437,0,0,1,.575,0l.539.539a.437.437,0,0,1,0,.575L7.1,14.8A.437.437,0,0,1,6.524,14.8Z"
          transform="translate(0 0)"
          fill="#fff"
        />
      </g>
    </g>
  </svg>
);

export default CheckedBoxIcon;
