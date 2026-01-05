import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import InputField from "components/InputField";
import PostnordDelivery from "../PostnordDelivery";
import { inputs } from "./data";
import postnordLogo from "assets/image/post/postnordLogo.webp";
import postenLogo from "assets/image/post/postenLogo.png";
import PostenDelivery from "../PostenDelivery";
import { address } from "utils/constants";
import styles from "./index.module.scss";

interface CustomerDetailsProps {
  setDeliveryPrice: (price: number) => void;
  setIsSetDelivery: (type: boolean) => void;
}

type DeliveryType = "post" | "pickup";
type Carrier = "postnord" | "posten";

const CustomerDetails: FC<CustomerDetailsProps> = ({
  setDeliveryPrice,
  setIsSetDelivery,
}) => {
  const { t } = useTranslation();

  const [deliveryType, setDeliveryType] = useState<DeliveryType>("post");
  const [delivery, setDelivery] = useState<Carrier>("postnord");

  // Самовивіз → доставка 0
  useEffect(() => {
    if (deliveryType === "pickup") {
      setIsSetDelivery(false);
    } else {
      setIsSetDelivery(true);
    }
  }, [deliveryType, setIsSetDelivery]);

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

        {/* Вибір типу доставки */}
        <label className={styles.deliveryType}>
          <span>{t("order.delivery")}</span>
          <select
            value={deliveryType}
            onChange={(e) => setDeliveryType(e.target.value as DeliveryType)}
          >
            <option value="post">{t("order.deliveryByPost")}</option>
            <option value="pickup">{t("order.pickup")}</option>
          </select>
        </label>

        {/* Самовивіз — адреса */}
        {deliveryType === "pickup" && (
          <div className={styles.pickupAddress}>
            <strong>{t("order.pickupAddressTitle")}</strong>
            <p>{address}</p>
            <p>{t("order.pickupAddressInfo")}</p>
          </div>
        )}

        {/* Пошта */}
        {deliveryType === "post" && (
          <>
            <div className={styles.postBox}>
              <label className={styles.post}>
                <input
                  type="radio"
                  name="delivery"
                  value="postnord"
                  checked={delivery === "postnord"}
                  onChange={(e) => setDelivery(e.target.value as Carrier)}
                />
                <span>
                  <img src={postnordLogo} alt="PostNord" />
                </span>
              </label>

              <label className={styles.post}>
                <input
                  type="radio"
                  name="delivery"
                  value="posten"
                  checked={delivery === "posten"}
                  onChange={(e) => setDelivery(e.target.value as Carrier)}
                />
                <span>
                  <img src={postenLogo} alt="Posten" />
                </span>
              </label>
            </div>

            {delivery === "postnord" ? (
              <PostnordDelivery setPrice={setDeliveryPrice} />
            ) : (
              <PostenDelivery setPrice={setDeliveryPrice} />
            )}
          </>
        )}

        <label htmlFor="orderComments" className={styles.orderComments}>
          <span>{t("order.orderNotes")}</span>
          <textarea
            id="orderComments"
            rows={8}
            placeholder={t("order.notesAboutOrder")}
          />
        </label>
      </div>
    </div>
  );
};

export default CustomerDetails;
