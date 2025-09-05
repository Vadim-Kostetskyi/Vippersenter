import logoImg from "assets/logo.png";
import styles from "./index.module.scss";

const Logo = () => {
  return (
    <div className={styles.logo}>
      <img src={logoImg} alt="" />
    </div>
  );
};

export default Logo;
