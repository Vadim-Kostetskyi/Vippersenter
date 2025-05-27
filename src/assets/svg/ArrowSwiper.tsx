import { JSX } from "react";

const ArrowSwiper = ({ className }: { className?: string }): JSX.Element => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M31 36L19 24L31 12"
      stroke="#FDFDFD"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ArrowSwiper;
