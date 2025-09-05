import { FC, PropsWithChildren } from "react";
import { Link, LinkProps, useLocation } from "react-router-dom";

const LangLink: FC<PropsWithChildren<LinkProps>> = ({
  to,
  children,
  ...props
}) => {
  const location = useLocation();
  const langPrefix = location.pathname.startsWith("/en") ? "/en" : "";

  // формуємо шлях, якщо to — рядок
  const path =
    typeof to === "string" ? `${langPrefix}${to}`.replace("//", "/") : to;

  return (
    <Link to={path} {...props}>
      {children}
    </Link>
  );
};

export default LangLink;
