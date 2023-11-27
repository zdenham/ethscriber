import React from 'react';

const Twitter: React.FC<{ size: number }> = ({ size }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width={size}
      height={size}
    >
      <g
        fill="none"
        stroke="none"
        strokeWidth="1"
        strokeLinecap="butt"
        strokeLinejoin="miter"
        strokeMiterlimit="10"
        strokeDasharray=""
        strokeDashoffset="0"
        fontFamily="none"
        fontWeight="none"
        fontSize="none"
        textAnchor="none"
        style={{ mixBlendMode: 'normal' }}
      >
        <g transform="scale(5.33333,5.33333)">
          <path
            d="M41,6l-31.071,36h-3.714l31.072,-36z"
            fill="#818181"
            fillRule="nonzero"
          ></path>
          <path
            d="M31.143,41l-23.323,-34h8.957l23.323,34z"
            fill="#ffffff"
            fillRule="evenodd"
          ></path>
          <path
            d="M15.724,9l20.578,30h-4.106l-20.578,-30h4.106M17.304,6h-11.382l24.694,36h11.382l-24.694,-36z"
            fill="#818181"
            fillRule="nonzero"
          ></path>
        </g>
      </g>
    </svg>
  );
};

export default Twitter;
