import { JSX } from "react";

const PlusSubtle = ({ className }: { className?: string }): JSX.Element => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="fff"
    width="20px"
    height="20px"
  >
    <path d="M5 13h6v6c0 0.552 0.448 1 1 1s1-0.448 1-1v-6h6c0.552 0 1-0.448 1-1s-0.448-1-1-1h-6v-6c0-0.552-0.448-1-1-1s-1 0.448-1 1v6h-6c-0.552 0-1 0.448-1 1s0.448 1 1 1z"></path>
  </svg>
);

export default PlusSubtle;
