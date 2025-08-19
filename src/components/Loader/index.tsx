import Load from "assets/svg/Load";
import styles from "./index.module.scss";

const Loader = () => {
  return (
    <div className={styles.loader}>
      <Load />
    </div>
  )
};

export default Loader;