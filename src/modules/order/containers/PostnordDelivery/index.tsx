import { useTranslation } from "react-i18next";
import InputField from "components/InputField";
import { inputs } from "./data";
import styles from "./index.module.scss";
import { useState } from "react";
import DropdownOrder from "modules/order/components/DropdownOrder";

const PostnordDelivery = () => {
  const [postalCode, setPostalCode] = useState(0);
    const [points, setPoints] = useState<any[]>([]);
    const [selectedPoint, setSelectedPoint] = useState<any>(null);
    const [deliveryPrice, setDeliveryPrice] = useState<number | null>(null);

  const { t } = useTranslation();

    const fetchPoints = async () => {
      const res = await fetch(
        `http://localhost/vise-data-base/api/v1/order/postnord/getServicePoints.php?postalCode=${postalCode}`
      );
      const data = await res.json();
      setPoints(data);
      setSelectedPoint(null);
      setDeliveryPrice(null);
  };
  
  const handleSelect = async (pointId: string) => {
    
      const point = points.find((p) => p.id === pointId);
      if (!point) return;

      setSelectedPoint(point);

      try {
        const res = await fetch(
          `http://localhost/vise-data-base/api/v1/order/postnord/calculateDelivery.php?toPostalCode=${point.postalCode}`
        );
        const data = await res.json();

        if (data.error) {
          setDeliveryPrice(null);
          alert(data.error);
        } else {
          setDeliveryPrice(data.price);
        }
      } catch (err) {
        console.error(err);
        setDeliveryPrice(null);
      }
  };
  
  return (
    <div className={styles.postnordDelivery}>
      {inputs.map(({ title, placeholder, type }) => (
        <InputField
          key={title}
          type={type}
          title={t(`order.${title}`)}
          placeholder={placeholder ? t(`order.${placeholder}`) : ""}
          onChange={(e) => setPostalCode(+e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && postalCode >= 1000) {
              fetchPoints();
            }
          }}
          require={true}
        />
      ))}

      {points.length > 0 && <DropdownOrder
        title={t("order.selectBranch")}
        list={points}
        onSetTitle={handleSelect}
        selected={selectedPoint?.id}
      />}
      {deliveryPrice !== null && <div>Ціна доставки: {deliveryPrice} NOK</div>} {/* delete */}
    </div>
  );
};

export default PostnordDelivery