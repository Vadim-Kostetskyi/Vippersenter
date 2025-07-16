import ProductsTable from "modules/product/components/ProductsDescription";
import AddProduct from "modules/product/components/AddProduct";
import AddProductModal from "modules/product/containers/AddProductModal";
import { useState } from "react";
import styles from "./index.module.scss";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onModalOpen = () => setIsModalOpen(true);
  const onModalClose = () => setIsModalOpen(false);

  return (
    <section className={styles.dashboard}>
      <ProductsTable />
      <AddProduct onModalOpen={onModalOpen} />
      {isModalOpen && <AddProductModal onModalClose={onModalClose} />}
    </section>
  );
};

export default Dashboard;
