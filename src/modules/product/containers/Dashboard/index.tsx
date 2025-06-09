import ProductsTable from "modules/product/components/ProductsTable";
import AddProduct from "modules/product/components/AddProduct";
import AddProductModal from "modules/product/containers/AddProductModal";
import styles from "./index.module.scss";

const Dashboard = () => {
  return (
    <section className={styles.dashboard}>
      <ProductsTable />
      <AddProduct />
      <AddProductModal />
    </section>
  );
};

export default Dashboard;
