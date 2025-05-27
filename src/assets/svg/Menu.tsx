import { JSX } from "react";

const Menu = ({ className }: { className?: string }): JSX.Element => (
  <svg className={className} viewBox="-2 -2 28 28" width="24px" height="24px">
    <path d="M5.333 14.667h16v2.667h-16zM5.333 8h21.333v2.667h-21.333zM5.333 24h9.647v-2.667h-9.647z"></path>
  </svg>
);

export default Menu;
