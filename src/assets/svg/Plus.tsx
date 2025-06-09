import { JSX } from "react";

const Plus = ({ className }: { className?: string }): JSX.Element => (
  <svg
    className={className}
    viewBox="2 2 28 28"
    fill="fff"
    width="20px"
    height="20px"
  >
    <path d="M31 12h-11v-11c0-0.552-0.448-1-1-1h-6c-0.552 0-1 0.448-1 1v11h-11c-0.552 0-1 0.448-1 1v6c0 0.552 0.448 1 1 1h11v11c0 0.552 0.448 1 1 1h6c0.552 0 1-0.448 1-1v-11h11c0.552 0 1-0.448 1-1v-6c0-0.552-0.448-1-1-1z"></path>
  </svg>
);

export default Plus;
