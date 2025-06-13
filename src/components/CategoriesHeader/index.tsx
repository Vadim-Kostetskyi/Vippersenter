import { useTranslation } from "react-i18next";
import styles from "./index.module.scss";
import Arrow from "assets/svg/Arrow";
import CategoryNames from "components/CategoryNames";

const CategoriesHeader = () => {
  const { t } = useTranslation();
  const { list } = CategoryNames(t);

  return (
    <ul className={styles.wrapper}>
      {list.map(({ key, label }) => {
        return (
          <li key={key}>
            <a href="#">{label}</a>
            <Arrow />
          </li>
        );
      })}
    </ul>
  );
};

export default CategoriesHeader;
