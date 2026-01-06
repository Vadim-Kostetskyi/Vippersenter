import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { skipToken } from "@reduxjs/toolkit/query";
import InputField from "components/InputField";
import DropdownOrder from "modules/order/components/DropdownOrder";
import Loader from "components/Loader";
import {
  useGetPickupPointsQuery,
  // useLazyGetShippingPriceQuery,
} from "storeRedux/ordersApi";
// import { postenDeliveryPrice } from "utils/postenDeliveryPrice";
import styles from "./index.module.scss";

interface PostenDeliveryProps {
  setPrice: (price: number) => void;
  setAddress: (address: string) => void;
}

const PostenDelivery: FC<PostenDeliveryProps> = ({ setPrice, setAddress }) => {
  const [postalCode, setPostalCode] = useState("");
  const [selectedPickup, setSelectedPickup] = useState<any>(null);

  const { t } = useTranslation();

  const {
    data: pickupPoints = [],
    isFetching: loadingPoints,
    isError,
  } = useGetPickupPointsQuery(
    postalCode.length === 4 ? String(postalCode) : skipToken
  );
  // console.log(selectedPickup.visitingPostalCode);

  // const [fetchShipping, { data: shippingData }] =
  //   useLazyGetShippingPriceQuery();

  useEffect(() => {
    setPrice(0), setAddress("");
  }, []);

  // useEffect(() => {
  //   if (shippingData) {
  //     const deliveryPrice = postenDeliveryPrice(shippingData)[0].amountWithVAT;
  //     setPrice(+deliveryPrice);
  //   }
  // }, [shippingData]);

  const handleSelect = (id: string) => {
    const point = pickupPoints.find((p: any) => p.id === id);
    if (!point) return;

    const address: any = {
      name: point.name,
      address: point.address,
      postalCode: point.postalCode,
      city: point.city,
    };
    setSelectedPickup(point);
    setAddress(address);

    // fetchShipping({
    //   postalCode: selectedPickup.visitingPostalCode,
    //   pickupId: id,
    // });
  };

  return (
    <div className={styles.postnordDelivery}>
      <InputField
        type="text"
        title="Postal Code"
        placeholder="Enter your postal code"
        onChange={(e) => setPostalCode(e.target.value)}
        require={true}
      />

      {pickupPoints?.length > 0 ? (
        <DropdownOrder
          title={t("order.selectBranch")}
          list={pickupPoints
            .filter((p: any) => p && p.id)
            .map((p: any) => ({
              id: p.id,
              title: `${p.name || ""} - ${p.city || ""} (${
                p.postalCode || ""
              })`,
            }))}
          onSetTitle={handleSelect}
          selected={selectedPickup?.id}
          posten={true}
        />
      ) : (
        <div
          className={!loadingPoints && isError ? styles.plugError : styles.plug}
        >
          {loadingPoints ? <Loader /> : null}
          {!loadingPoints && isError ? (
            <span>{t("order.incorrectBranchNumber")}</span>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default PostenDelivery;
