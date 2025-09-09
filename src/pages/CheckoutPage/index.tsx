import PaymentCard from "components/PaymentCard";
import MainLayout from "modules/core/components/MainLayout";
import Checkout from "modules/order/containers/Checkout";

const CheckoutPage = () => (
  <MainLayout>
    <Checkout />
    <PaymentCard />
  </MainLayout>
);

export default CheckoutPage;
