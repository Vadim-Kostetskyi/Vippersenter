import { FC, useState } from "react";
import styles from "./index.module.scss";

interface DropdownProps {
  title: string;
  list: any[];
  onSetCategory: (item: string) => void;
  className?: string;
}

const Dropdown: FC<DropdownProps> = ({
  title,
  list,
  onSetCategory,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const onSendInfo = (item: string) => {
    onSetCategory(item);
    handleOpen();
  };

  return (
    <div className={`${styles.dropdown}, ${className}`}>
      <button
        className={`${styles.button} ${isOpen ? styles.open : ""}`}
        onClick={handleOpen}
      >
        {title}
      </button>
      {isOpen && (
        <div className={styles.list}>
          {list.map(({ key, labelEng }) => (
            <button key={key} onClick={() => onSendInfo(labelEng)}>
              {labelEng}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
