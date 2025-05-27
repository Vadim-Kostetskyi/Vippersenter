import { useState } from "react";
import HeaderModal from "../HeaderModal";
import Menu from "assets/svg/Menu";
import styles from "./index.module.scss";

const BurgerMenu = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const toggle = () => {
    setModalIsOpen(!modalIsOpen);
  };

  return (
    <>
      <button className={styles.menuBtn} onClick={toggle}>
        <Menu />
      </button>
      {modalIsOpen && <HeaderModal onClose={toggle} />}
    </>
  );
};

export default BurgerMenu;
