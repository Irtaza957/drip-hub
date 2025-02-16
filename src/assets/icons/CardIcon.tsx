import React from "react";

const CardIcon: React.FC<IconProps> = ({
  fillColor = "currentColor",
  width = 21.877,
  height = 14.876,
  className = "",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 21.877 14.876"
    className={className}
  >
    <g id="Group_3252" data-name="Group 3252" transform="translate(0 -81.92)">
      <g id="Group_3243" data-name="Group 3243" transform="translate(0 81.92)">
        <g id="Group_3242" data-name="Group 3242" transform="translate(0 0)">
          <path
            id="Path_3295"
            data-name="Path 3295"
            d="M20.564,81.92H1.313A1.314,1.314,0,0,0,0,83.233V95.484A1.314,1.314,0,0,0,1.313,96.8H20.564a1.314,1.314,0,0,0,1.313-1.313V83.233A1.314,1.314,0,0,0,20.564,81.92ZM21,95.484a.439.439,0,0,1-.438.438H1.313a.438.438,0,0,1-.438-.438V83.233a.438.438,0,0,1,.438-.438H20.564a.438.438,0,0,1,.438.438Z"
            transform="translate(0 -81.92)"
            fill={fillColor}
          />
        </g>
      </g>
      <g
        id="Group_3245"
        data-name="Group 3245"
        transform="translate(0.438 85.858)"
      >
        <g id="Group_3244" data-name="Group 3244">
          <rect
            id="Rectangle_1830"
            data-name="Rectangle 1830"
            width="21.002"
            height="1.75"
            fill={fillColor}
          />
        </g>
      </g>
      <g id="Group_3247" data-name="Group 3247" transform="translate(0 85.42)">
        <g id="Group_3246" data-name="Group 3246" transform="translate(0 0)">
          <path
            id="Path_3296"
            data-name="Path 3296"
            d="M21.44,163.84h-21a.438.438,0,0,0-.438.438v1.75a.438.438,0,0,0,.438.438h21a.438.438,0,0,0,.438-.438v-1.75A.438.438,0,0,0,21.44,163.84ZM21,165.59H.875v-.875H21Z"
            transform="translate(0 -163.84)"
            fill={fillColor}
          />
        </g>
      </g>
      <g
        id="Group_3249"
        data-name="Group 3249"
        transform="translate(3.5 90.671)"
      >
        <g id="Group_3248" data-name="Group 3248" transform="translate(0 0)">
          <path
            id="Path_3297"
            data-name="Path 3297"
            d="M90.233,286.72H82.358a.438.438,0,1,0,0,.875h7.876a.438.438,0,1,0,0-.875Z"
            transform="translate(-81.92 -286.72)"
            fill={fillColor}
          />
        </g>
      </g>
      <g
        id="Group_3251"
        data-name="Group 3251"
        transform="translate(3.5 92.421)"
      >
        <g id="Group_3250" data-name="Group 3250" transform="translate(0 0)">
          <path
            id="Path_3298"
            data-name="Path 3298"
            d="M86.733,327.68H82.358a.438.438,0,1,0,0,.875h4.375a.438.438,0,1,0,0-.875Z"
            transform="translate(-81.92 -327.68)"
            fill={fillColor}
          />
        </g>
      </g>
    </g>
  </svg>
);

export default CardIcon;
