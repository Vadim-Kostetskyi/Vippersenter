import { FC, ReactNode } from "react";
import Header from "modules/core/containers/Header";
import Footer from "modules/core/containers/Footer";
import styles from "./index.module.scss";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => (
  <>
    <Header />
    <div className={styles.main}>{children}</div>
    <Footer />
  </>
);

export default MainLayout;
