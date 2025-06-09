import ProductsTable from "modules/product/components/ProductsTable";
import styles from "./index.module.scss";

const Dashboard = () => {
  return (
    <section className={styles.dashboard}>
      <ProductsTable />
    </section>
  );
};

export default Dashboard;
