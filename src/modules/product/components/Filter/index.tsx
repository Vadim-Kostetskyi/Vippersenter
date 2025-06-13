import { useTranslation } from "react-i18next";
import styles from "./index.module.scss";
import DropdownFilter from "../DropdownFilter";
import { bend } from "./data";

const Filter = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.filter}>
      <button className={styles.clearBtn}>
        {t("filter.clearEverything")}.
      </button>
      <form className={styles.form}>
        <div className={styles.categories}>
          <h2>{t("filter.categories")}</h2>
          <label>
            <input type="checkbox" />
            <span>20 {t("filter.lines")}</span>
          </label>

          <label>
            <input type="checkbox" />
            <span>28 {t("filter.lines")}</span>
          </label>
          <label>
            <input type="checkbox" />
            <span>{t("lines")}</span>
          </label>
        </div>
        <DropdownFilter title={t("filter.bend")} items={bend} />
      </form>
    </div>
  );
};

export default Filter;
