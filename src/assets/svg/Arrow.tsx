import { JSX } from "react";

const Arrow = ({ className }: { className?: string }): JSX.Element => (
  <svg
    className={className}
    viewBox="2 2 28 28"
    fill="fff"
    width="20px"
    height="20px"
  >
    <path d="M24.301 14.971l-14.545-14.545c-0.568-0.568-1.489-0.568-2.057 0s-0.568 1.489 0 2.057l13.517 13.517-13.517 13.517c-0.568 0.568-0.568 1.489 0 2.057 0.284 0.284 0.656 0.426 1.028 0.426s0.745-0.142 1.029-0.426l14.545-14.546c0.273-0.273 0.426-0.643 0.426-1.028s-0.153-0.756-0.426-1.029z"></path>
  </svg>
);

export default Arrow;
