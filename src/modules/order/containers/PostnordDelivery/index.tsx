import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { skipToken } from "@reduxjs/toolkit/query";
import InputField from "components/InputField";
import DropdownOrder from "modules/order/components/DropdownOrder";
import { inputs } from "./data";
import styles from "./index.module.scss";
import { useCalculateDeliveryQuery, useGetPostnordServicePointsQuery } from "storeRedux/ordersApi";

interface PostnordDeliveryProps {
  setPrice: (price: number) => void;
}

const PostnordDelivery: FC<PostnordDeliveryProps> = ({ setPrice }) => {
  const [postalCode, setPostalCode] = useState(0);
  const [points, setPoints] = useState<any[]>([]);
  const [selectedPoint, setSelectedPoint] = useState<any>(null);  

  const { t } = useTranslation();

  const { data, isFetching } = useGetPostnordServicePointsQuery(
    postalCode >= 1000 && postalCode < 10000 ? String(postalCode) : skipToken
  );  

  const { data: deliveryData, refetch: refetchDelivery } =
    useCalculateDeliveryQuery(selectedPoint?.postalCode || skipToken);

  useEffect(() => {
    if (data) {
      setPoints(data);
      setSelectedPoint(null);
      setPrice(0);
    }
  }, [data]);

  useEffect(() => {
    if (deliveryData) {
      if (deliveryData.error) {
        setPrice(0);
        alert(deliveryData.error);
      } else {
        setPrice(deliveryData.price);
      }
    }
  }, [deliveryData]);

  const handleSelect = (pointId: string) => {
    const point = points.find((p) => p.id === pointId);
    if (!point) return;
    setSelectedPoint(point);
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