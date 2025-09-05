import { FC } from "react";
import logoImg from "assets/logo.png";
import styles from "./index.module.scss";

interface LogoProps {
  footer?: boolean;
}

const Logo: FC<LogoProps> = ({ footer }) => (
  <div className={footer ? styles.footerLogo : styles.logo}>
    <img src={logoImg} alt="" />
  </div>
);

export default Logo;
