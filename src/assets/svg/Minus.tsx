import { JSX } from "react";

const Minus = ({ className }: { className?: string }): JSX.Element => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="fff"
    width="20px"
    height="20px"
  >
    <path d="M16 10c0 0.553-0.048 1-0.601 1h-10.798c-0.552 0-0.601-0.447-0.601-1s0.049-1 0.601-1h10.799c0.552 0 0.6 0.447 0.6 1z"></path>
  </svg>
);

export default Minus;
