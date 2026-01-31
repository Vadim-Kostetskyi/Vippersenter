import { toast } from "react-toastify";
import { OrderFormData } from "modules/order/containers/CheckoutInfo";

interface EmptyInputCheckArgs {
  formData: OrderFormData;
  t: (key: string) => string;
  countError: boolean;
}

export const emptyInputCheck = ({
  formData,
  t,
  countError,
}: EmptyInputCheckArgs): boolean => {
  const {
    name,
    lastName,
    phone,
    email,
    town,
    deliveryType,
    setDeliveryAddress,
  } = formData;

  const hasError =
    name.trim().length === 0 ||
    lastName.trim().length === 0 ||
    phone.trim().length === 0 ||
    email.trim().length === 0 ||
    town.trim().length === 0;

  if (countError) {
    toast.error(t("payment.insufficientAmount"));
    return true;
  }

  if (hasError) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    toast.error(t("payment.fillError"));
    return true;
  }

  if (deliveryType === "post" && setDeliveryAddress.length === 0) {
    window.scrollTo({ top: 200, behavior: "smooth" });
    toast.error(t("payment.deliveryError"));
    return true;
  }

  return false;
};
