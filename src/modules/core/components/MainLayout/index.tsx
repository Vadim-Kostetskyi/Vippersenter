import { FC, ReactNode } from "react";
import Header from "modules/core/containers/Header";
import Footer from "modules/core/containers/Footer";
import MenuBar from "../MenuBar";
import styles from "./index.module.scss";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => (
  <>
    <MenuBar />
    <Header />
    <main className={styles.main}>{children}</main>
    <Footer />
  </>
);

export default MainLayout;
