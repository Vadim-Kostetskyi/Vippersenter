import { JSX } from "react";

const ArrowTriangle = ({ className }: { className?: string }): JSX.Element => (
  <svg
    className={className}
    viewBox="-2 -2 28 28"
    fill="fff"
    width="20px"
    height="20px"
  >
    <path d="M6.984 14.016l5.016-5.016 5.016 5.016h-10.031z"></path>
  </svg>
);

export default ArrowTriangle;
