import React, { FC, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import InputField from "components/InputField";
import PostnordDelivery from "../PostnordDelivery";
import PostenDelivery from "../PostenDelivery";
import { inputs } from "./data";
import postnordLogo from "assets/image/post/postnordLogo.webp";
import postenLogo from "assets/image/post/postenLogo.png";
import { address } from "utils/constants";
import { Carrier, DeliveryType, OrderFormData } from "../CheckoutInfo";
import styles from "./index.module.scss";

interface CustomerDetailsProps {
  setDeliveryPrice: (price: number) => void;
  setIsSetDelivery: (type: boolean) => void;
  onChangeForm: (data: OrderFormData) => void;
}

type InputType = "text" | "email" | "tel" | "number" | string;

const CustomerDetails: FC<CustomerDetailsProps> = ({
  setDeliveryPrice,
  setIsSetDelivery,
  onChangeForm,
}) => {
  const { t } = useTranslation();

  const initialDynamicFields = useMemo(() => {
    const obj: Record<string, string> = {};
    inputs.forEach(({ title }) => {
      obj[title] = "";
    });
    return obj;
  }, []);

  const [formData, setFormData] = useState<OrderFormData>({
    ...initialDynamicFields,
    deliveryType: "post",
    carrier: "postnord",
    orderComments: "",
  });

  useEffect(() => {
    if (formData.deliveryType === "pickup") {
      setIsSetDelivery(false);
      setDeliveryPrice(0);
      setFormData((prev) => ({
        ...prev,
        carrier: "",
      }));
    } else {
      setIsSetDelivery(true);
      setFormData((prev) => ({
        ...prev,
        carrier: "postnord",
      }));
    }
  }, [formData.deliveryType]);

  useEffect(() => {
    onChangeForm?.(formData);
  }, [formData, onChangeForm]);

  const updateField = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const updateDeliveryType = (value: DeliveryType) => {
    setFormData((prev) => ({ ...prev, deliveryType: value }));
  };

  const updateCarrier = (value: Carrier) => {
    setFormData((prev) => ({ ...prev, carrier: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // - поля з inputs: formData[title]
    // - deliveryType, carrier, orderComments
    // - плюс адрес самовывоза (если pickup)
    const payload = {
      ...formData,
      pickupAddress: formData.deliveryType === "pickup" ? address : null,
    };

    console.log("ORDER FORM DATA:", payload);
  };

  const onSetDeliveryAddress = (address: string) => {
    setFormData((prev) => ({ ...prev, setDeliveryAddress: address }));
  };

  return (
    <div className={styles.customerDetails}>
      <h3>{t("order.billingShipping")}</h3>

      <div className={styles.detailsBox}>
        <form onSubmit={handleSubmit}>
          {inputs.map(({ title, placeholder, type }) => (
            <InputField
              key={title}
              type={type as InputType}
              title={t(`order.${title}`)}
              placeholder={placeholder ? t(`order.${placeholder}`) : ""}
              require={true}
              value={formData[title] ?? ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateField(title, e.target.value)
              }
            />
          ))}

          <label className={styles.deliveryType}>
            <span>{t("order.delivery")}</span>
            <select
              value={formData.deliveryType}
              onChange={(e) =>
                updateDeliveryType(e.target.value as DeliveryType)
              }
            >
              <option value="post">{t("order.deliveryByPost")}</option>
              <option value="pickup">{t("order.pickup")}</option>
            </select>
          </label>

          {formData.deliveryType === "pickup" && (
            <div className={styles.pickupAddress}>
              <strong>{t("order.pickupAddressTitle")}</strong>
              <p>{address}</p>
              <p>{t("order.pickupAddressInfo")}</p>
            </div>
          )}

          {/* Почта */}
          {formData.deliveryType === "post" && (
            <>
              <div className={styles.postBox}>
                <label className={styles.post}>
                  <input
                    type="radio"
                    name="delivery"
                    value="postnord"
                    checked={formData.carrier === "postnord"}
                    onChange={() => updateCarrier("postnord")}
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
                    checked={formData.carrier === "posten"}
                    onChange={() => updateCarrier("posten")}
                  />
                  <span>
                    <img src={postenLogo} alt="Posten" />
                  </span>
                </label>
              </div>

              {formData.carrier === "postnord" ? (
                <PostnordDelivery
                  setPrice={setDeliveryPrice}
                  setAddress={onSetDeliveryAddress}
                />
              ) : (
                <PostenDelivery
                  setPrice={setDeliveryPrice}
                  setAddress={onSetDeliveryAddress}
                />
              )}
            </>
          )}

          <label htmlFor="orderComments" className={styles.orderComments}>
            <span>{t("order.orderNotes")}</span>
            <textarea
              id="orderComments"
              rows={8}
              placeholder={t("order.notesAboutOrder")}
              value={formData.orderComments}
              onChange={(e) => updateField("orderComments", e.target.value)}
            />
          </label>
        </form>
      </div>
    </div>
  );
};

export default CustomerDetails;
