import { FC, useState } from "react";
import styles from "./index.module.scss";

interface DropdownProps {
  title: string;
  list: any[];
  onSetTitle: (item: string) => void;
}

const Dropdown: FC<DropdownProps> = ({ title, list, onSetTitle }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const onSendInfo = (item: string) => {
    onSetTitle(item);
    handleOpen();
  };

  return (
    <div className={styles.dropdown}>
      <button
        className={`${styles.button} ${isOpen ? styles.open : ""}`}
        onClick={handleOpen}
      >
        {title}
      </button>
      {isOpen && (
        <div className={styles.list}>
          {list.map(({ key, label }) => (
            <button key={key} onClick={() => onSendInfo(label)}>
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
