import { useTranslation } from "react-i18next";
import image from "assets/image/applies-eyelashes.jpeg";
import styles from "./index.module.scss";
import { data } from "../FooterInfo/data";

const AboutUs = () => {
  const { t } = useTranslation();

  const list = [
    t("aboutUs.text1"),
    t("aboutUs.text2"),
    t("aboutUs.text3"),
    t("aboutUs.text4"),
  ];

  return (
    <section className={styles.aboutUs}>
      <div>
        <img src={image} alt="" />
      </div>
      <div>
        <div className={styles.list}>
          {list.map((text, index) =>
            index ? (
              index === 1 ? (
                <span>{text}</span>
              ) : (
                <p>{text}</p>
              )
            ) : (
              <b>{text}</b>
            )
          )}
        </div>
        <h2>{t("aboutUs.contactDetails")}</h2>
        <div className={styles.about}>
          {data[2].text.map((item) => (
            <span>
              <span className={styles.text} key={item}>
                {t(item)}
              </span>
              {item === "Bergen Norway" ? (
                <img
                  src="https://flagcdn.com/w20/no.png"
                  width="20"
                  height="15"
                  alt="Прапор Норвегії"
                />
              ) : null}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
