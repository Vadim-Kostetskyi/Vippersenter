import { useTranslation } from "react-i18next";
import { data } from "./data";
import styles from "./index.module.scss";

const FooterInfo = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <div></div>
      <ul>
        {data.map(({ title, text, subtitles }, index) =>
          index ? (
            subtitles ? (
              <li>
                <p className={styles.title}>{t(title)}</p>
                {subtitles.map(({ subtitle, text }) => (
                  <>
                    <p className={styles.subtitle}>{t(subtitle)}</p>
                    {text.map((item) => (
                      <p className={styles.text}>{item}</p>
                    ))}
                  </>
                ))}
              </li>
            ) : (
              <li>
                <p className={styles.title}>{t(title)}</p>
                {text
                  ? text.map((item) => <p className={styles.text}>{t(item)}</p>)
                  : null}
              </li>
            )
          ) : (
            <li>
              <nav>
                <p className={styles.title}>{t(title)}</p>
                {text ? text.map((item) => <a href="#">{t(item)}</a>) : null}
              </nav>
            </li>
          )
        )}
      </ul>
      <div className={styles.copyright}>
        <p>© 2021 Golden Soft All rights reserved.</p>
      </div>
    </div>
  );
};

export default FooterInfo;
