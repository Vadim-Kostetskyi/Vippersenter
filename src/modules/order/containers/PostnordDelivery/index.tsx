import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import InputField from "components/InputField";
import DropdownOrder from "modules/order/components/DropdownOrder";
import { inputs } from "./data";
import styles from "./index.module.scss";

interface PostnordDeliveryProps {
  setPrice: (price: number) => void;
}

const PostnordDelivery: FC<PostnordDeliveryProps> = ({ setPrice }) => {
  const [postalCode, setPostalCode] = useState(0);
  const [points, setPoints] = useState<any[]>([]);
  const [selectedPoint, setSelectedPoint] = useState<any>(null);

  useEffect(() => {
    if (postalCode >= 1000 && postalCode < 10000) {
      fetchPoints();
    }
  }, [postalCode]);


  const { t } = useTranslation();

  const fetchPoints = async () => {
    const res = await fetch(
      `/myAPI/api/v1/order/postnord/getServicePoints.php?postalCode=${postalCode}`
    );
    const data = await res.json();
    setPoints(data);
    setSelectedPoint(null);
    setPrice(0);
  };

  const handleSelect = async (pointId: string) => {
    const point = points.find((p) => p.id === pointId);
    if (!point) return;

    setSelectedPoint(point);

    try {
      const res = await fetch(
        `/myAPI/api/v1/order/postnord/calculateDelivery.php?toPostalCode=${point.postalCode}`
      );
      const data = await res.json();

      if (data.error) {
        setPrice(0);
        alert(data.error);
      } else {
        setPrice(data.price);
      }
    } catch (err) {
      console.error(err);
      setPrice(0);
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
          require={true}
        />
      ))}
      {points.length > 0 ? (
        <DropdownOrder
          title={t("order.selectBranch")}
          list={points}
          onSetTitle={handleSelect}
          selected={selectedPoint?.id}
        />
      ) : (
        <div className={styles.plug}></div>
      )}
    </div>
  );
};

export default PostnordDelivery