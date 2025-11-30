import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import InputField from "components/InputField";
import PostnordDelivery from "../PostnordDelivery";
import { inputs } from "./data";
import postnordLogo from "assets/image/post/postnordLogo.webp";
import postenLogo from "assets/image/post/postenLogo.png";
import PostenDelivery from "../PostenDelivery";
import styles from "./index.module.scss";

interface CustomerDetailsProps {
  setPrice: (price: number) => void;
}

const CustomerDetails: FC<CustomerDetailsProps> = ({ setPrice }) => {
  const [delivery, setDelivery] = useState("postnord");
  const { t } = useTranslation();

  return (
    <div className={styles.customerDetails}>
      <h3>{t("order.billingShipping")}</h3>
      <div className={styles.detailsBox}>
        {inputs.map(({ title, placeholder, type }) => (
          <InputField
            key={title}
            type={type}
            title={t(`order.${title}`)}
            placeholder={placeholder ? t(`order.${placeholder}`) : ""}
            require={true}
          />
        ))}
        <div className={styles.postBox}>
          <label className={styles.post}>
            <input
              type="radio"
              name="delivery"
              value="postnord"
              checked={delivery === "postnord"}
              onChange={(e) => setDelivery(e.target.value)}
            />
            <span>
              <img src={postnordLogo} alt="" />
            </span>
          </label>

          <label className={styles.post}>
            <input
              type="radio"
              name="delivery"
              value="posten"
              checked={delivery === "posten"}
              onChange={(e) => setDelivery(e.target.value)}
            />
            <span>
              <img src={postenLogo} alt="" />
            </span>
          </label>
        </div>

        {delivery === "postnord" ? (
          <PostnordDelivery setPrice={setPrice} />
        ) : (
          <PostenDelivery setPrice={setPrice} />
        )}
        <label htmlFor="orderComments" className={styles.orderComments}>
          <span>{t("order.orderNotes")}</span>
          <textarea
            name=""
            id="orderComments"
            rows={8}
            placeholder={t("order.notesAboutOrder")}
          ></textarea>
        </label>
      </div>
    </div>
  );
};

export default CustomerDetails;
