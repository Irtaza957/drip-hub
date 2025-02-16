import React from "react";

const CartTwoIcon: React.FC<IconProps> = ({
  fillColor = "currentColor",
  width = 28.102,
  height = 28.472,
  className = "",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 28.102 28.472"
    className={className}
  >
    <path
      id="Path_3227"
      data-name="Path 3227"
      d="M4.678,20.748V4.678H2V2H6.017A1.339,1.339,0,0,1,7.357,3.339v16.07H24.013L26.691,8.7H10.035V6.017H28.408a1.339,1.339,0,0,1,1.3,1.665L26.359,21.073a1.339,1.339,0,0,1-1.3,1.014H6.017A1.339,1.339,0,0,1,4.678,20.748Zm2.678,9.374a2.678,2.678,0,1,1,2.678-2.678A2.678,2.678,0,0,1,7.357,30.122Zm16.07,0A2.678,2.678,0,1,1,26.1,27.443,2.678,2.678,0,0,1,23.426,30.122Z"
      transform="translate(-1.825 -1.825)"
      fill={fillColor}
      stroke="#141a2e"
      strokeWidth="0.35"
    />
  </svg>
);

export default CartTwoIcon;
