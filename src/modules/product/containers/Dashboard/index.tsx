import ProductsTable from "modules/product/components/ProductsTable";
import styles from "./index.module.scss";
import AddProduct from "modules/product/components/AddProduct";

const Dashboard = () => {
  return (
    <section className={styles.dashboard}>
      <ProductsTable />
      <AddProduct />
    </section>
  );
};

export default Dashboard;
