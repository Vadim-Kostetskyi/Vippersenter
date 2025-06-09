import { FC, useState } from "react";
import styles from "./index.module.scss";

interface DropdownProps {
  title: string;
  list: any[];
}

const Dropdown: FC<DropdownProps> = ({ title, list }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState(title);

  const onClick = () => {
    setIsOpen(!isOpen);
  };

  const onSetTitle = (item: string) => {
    setSelectedTitle(item);
    setIsOpen(false);
  };
  return (
    <div className={styles.dropdown}>
      <button
        className={`${styles.button} ${isOpen ? styles.open : ""}`}
        onClick={onClick}
      >
        {selectedTitle}
      </button>
      {isOpen && (
        <div className={styles.list}>
          {list.map(({ key, label }) => (
            <button key={key} onClick={() => onSetTitle(label)}>
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
