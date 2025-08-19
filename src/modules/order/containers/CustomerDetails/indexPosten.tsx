import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { inputs } from "./data";
import InputField from "components/InputField";
import DropdownOrder from "modules/order/components/DropdownOrder";
import styles from "./index.module.scss";

const CustomerDetails = () => {
  const [selectedCity, setSelectedCity] = useState('вапвап');
  const [countriesList, setCountriesList] = useState([]);  

  const { t } = useTranslation();

  const onSelectCity = (city: string) => {
    setSelectedCity(city);
  }

  useEffect(() => {
    fetch("http://localhost/vise-data-base/api/v1/order/posten/sities.php")
      .then((res) => res.json())
      .then((data) => setCountriesList(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    <div className={styles.customerDetails}>
      <h3>{t("order.billingShipping")}</h3>
      <div className={styles.detailsBox}>
        {inputs.map(({ title, placeholder, type, dropdown }) =>
          dropdown ? (
            <DropdownOrder
              key={title}
              title={t(`order.${title}`)}
              list={countriesList}
              onSetTitle={onSelectCity}
              selected={selectedCity}
            />
          ) : (
            <InputField
              key={title}
              type={type}
              title={t(`order.${title}`)}
              placeholder={placeholder ? t(`order.${placeholder}`) : ""}
              require={true}
            />
          )
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
