import { JSX } from "react";

const Cross = ({ className }: { className?: string }): JSX.Element => (
  <svg
    className={className}
    viewBox="2 2 28 28"
    fill="fff"
    width="20px"
    height="20px"
  >
    <path d="M5.86 4.040l-1.82 1.82 10.14 10.14-10.2 10.22 1.8 1.8 10.22-10.2 10.2 10.2 1.82-1.82-10.2-10.2 10.14-10.14-1.82-1.82-10.14 10.14z"></path>
  </svg>
);

export default Cross;
