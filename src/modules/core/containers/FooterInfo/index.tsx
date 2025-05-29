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
      <Logo className={styles.logo} />

      <ul>
        {data.map(({ title, text }, index) => (
          <li>
            <p className={styles.title}>{t(title)}</p>
            {index ? (
              index === 1 ? (
                <nav>
                  {text.map((item) => (
                    <a href="#">{t(item)}</a>
                  ))}
                </nav>
              ) : (
                text.map((item) => <p className={styles.text}>{t(item)}</p>)
              )
            ) : (
              <nav>
                {list.map(({ label }) => (
                  <a href="#">{label}</a>
                ))}
              </nav>
            )}
          </li>
        ))}
      </ul>
      <div className={styles.copyright}>
        <p>@ EFFECT 2023</p>
      </div>
    </div>
  );
};

export default FooterInfo;
