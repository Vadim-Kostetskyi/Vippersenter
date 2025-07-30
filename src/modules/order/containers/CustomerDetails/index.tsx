import { useTranslation } from "react-i18next";
import { Inputs } from "./data";
import InputField from "components/InputField";
import styles from "./index.module.scss";

const CustomerDetails = () => {
  const { t } = useTranslation();

  const postalCode = "0010"; // приклад
  fetch(`http://localhost/vise-data-base/api/v1/order/index.php?postalCode=${postalCode}`)
    .then((res) => res.json())
    .then((data) => {
      console.log("Pickup points:", data);
      // Рендериш список відділень у формі
    })
    .catch((err) => console.error("Error:", err));

  
  return (
    <div className={styles.customerDetails}>
      <h3>{t("order.billingShipping")}</h3>
      <div className={styles.detailsBox}>
        {Inputs.map(({ title, placeholder, type }) => (
          <InputField
            key={title}
            type={type}
            title={t(`order.${title}`)}
            placeholder={placeholder ? t(`order.${placeholder}`) : ""}
            require={true}
          />
        ))}
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
