import { useTranslation } from "react-i18next";
import styles from "./index.module.scss";
import Arrow from "assets/svg/Arrow";

const Categories = () => {
  const { t } = useTranslation();
  return (
    <ul className={styles.wrapper}>
      <li>
        <a href="#">{t("categories.falseEyelashes")}</a>
        <Arrow />
      </li>
      <li>
        <a href="#">{t("categories.glueForEyelashes")}</a>
        <Arrow />
      </li>
      <li>
        <a href="#">{t("categories.remover")}</a>
        <Arrow />
      </li>
      <li>
        <a href="#">{t("categories.preparations")}</a>
        <Arrow />
      </li>
    </ul>
  );
};

export default Categories;
