import React from "react";

const WalletIcon: React.FC<IconProps> = ({
  borderColor = "currentColor",
  fillColor = "currentColor",
  width = 18.941,
  height = 17.189,
  className = "",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 18.941 17.189"
    className={className}
  >
    <path
      id="Path_3611"
      data-name="Path 3611"
      d="M17.523,9.7V5.5a.584.584,0,0,0-.584-.584h-.584V3.168A1.168,1.168,0,0,0,15.187,2H1.168A1.168,1.168,0,0,0,0,3.168V18.355a.584.584,0,0,0,.584.584H16.939a.584.584,0,0,0,.584-.584V14.161a1.752,1.752,0,0,0,1.168-1.647V11.346A1.752,1.752,0,0,0,17.523,9.7ZM1.168,3.168H15.187V4.92H1.168Zm15.187,14.6H1.168V6.089H16.355v3.5H12.266a1.752,1.752,0,0,0-1.752,1.752v1.168a1.752,1.752,0,0,0,1.752,1.752h4.089Zm1.168-5.257a.584.584,0,0,1-.584.584H12.266a.584.584,0,0,1-.584-.584V11.346a.584.584,0,0,1,.584-.584h4.673a.584.584,0,0,1,.584.584Z"
      transform="translate(0.125 -1.875)"
      fill={fillColor}
      stroke={borderColor}
      strokeWidth="0.25"
    />
  </svg>
);

export default WalletIcon;
