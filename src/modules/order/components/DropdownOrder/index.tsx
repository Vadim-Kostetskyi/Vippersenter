import { FC, useState } from "react";
import ArrowTriangle from "assets/svg/ArrowTriangle";
import styles from "./index.module.scss";

interface DropdownProps {
  title: string;
  list: any[];
  selected: string;
  onSetTitle: (item: string) => void;
}

const DropdownOrder: FC<DropdownProps> = ({
  title,
  list,
  selected,
  onSetTitle,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const onSendInfo = (item: string) => {
    onSetTitle(item);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdown}>
      <h4>{title}</h4>

      <div className={`${styles.wrapper} ${isOpen ? styles.open : ""}`}>
        <button className={styles.button} onClick={handleOpen} type="button">
          <span>
            {selected}
            <ArrowTriangle className={isOpen ? styles.open : styles.arrow} />
          </span>
        </button>

        {isOpen && (
          <div className={styles.list}>
            <input
              type="text"
              onClick={(e) => e.stopPropagation()}
            />
            {list.map((label) => (
              <button
                type="button"
                key={label}
                onClick={() => onSendInfo(label)}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DropdownOrder;
