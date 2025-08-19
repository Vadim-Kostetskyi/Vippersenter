import { FC } from "react";
import { useTranslation } from "react-i18next";
import InputField from "components/InputField";
import PostnordDelivery from "../PostnordDelivery";
import { inputs } from "./data";
import styles from "./index.module.scss";

interface CustomerDetailsProps {
  setPrice: (price: number) => void;
}

const CustomerDetails: FC<CustomerDetailsProps> = ({ setPrice }) => {
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
        <PostnordDelivery setPrice={setPrice} />
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
