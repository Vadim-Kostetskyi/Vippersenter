import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { data } from "./data";
import CategoryNames from "../../../../components/CategoryNames";
import Logo from "assets/svg/Logo";
import styles from "./index.module.scss";

const FooterInfo = () => {
  const { t } = useTranslation();
  const { list } = CategoryNames(t);

  return (
    <div className={styles.wrapper}>
      <div>
        <Logo className={styles.logo} />
        <ul>
          {data.map(({ title, text }, index) => (
            <li key={title}>
              <p className={styles.title}>{t(title)}</p>
              {index ? (
                index === 1 ? (
                  <nav>
                    {text.map((item) => (
                      <Link to="#" key={item}>
                        {t(item)}
                      </Link>
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
                    <Link to={`/product-category/${key}`} key={label}>
                      {label}
                    </Link>
                  ))}
                </nav>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.copyright}>
        <p>@ EFFECT 2023</p>
      </div>
    </div>
  );
};

export default FooterInfo;
