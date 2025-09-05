import LangLink from "utils/LangLink";
import { useTranslation } from "react-i18next";
import { data } from "./data";
import CategoryNames from "../../../../components/CategoryNames";
import Logo from "components/Logo";
import styles from "./index.module.scss";

const FooterInfo = () => {
  const { t } = useTranslation();
  const { list } = CategoryNames(t);

  return (
    <div className={styles.wrapper}>
      <div>
        <Logo footer={true} />
        <ul>
          {data.map(({ title, text }, index) => (
            <li key={title}>
              <p className={styles.title}>{t(title)}</p>
              {index ? (
                index === 1 ? (
                  <nav>
                    {text.map((item) => (
                      <LangLink to="#" key={item}>
                        {t(item)}
                      </LangLink>
                    ))}
                  </nav>
                ) : (
                  text.map((item) => (
                    <p className={styles.text} key={item}>
                      {t(item)}
                    </p>
                  ))
                )
              ) : (
                <nav>
                  {list.map(({ key, label }) => (
                    <LangLink to={`/product-category/${key}`} key={label}>
                      {label}
                    </LangLink>
                  ))}
                </nav>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.copyright}>
        <p>@ Vipper Senter 2025</p>
      </div>
    </div>
  );
};

export default FooterInfo;
